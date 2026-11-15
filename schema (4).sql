-- =====================================================================
-- GATSapp: database setup for Supabase
-- Paste this whole file into Supabase > SQL Editor > New query > Run.
-- It is safe to run more than once.
--
-- Roles:
--   pending  signed up, waiting for an admin to approve them (sees nothing)
--   member   approved: sees published events, RSVPs, volunteers
--   admin    member + approves people, edits events and checklists
--   owner    admin + promotes/demotes admins (the first person to sign up)
--   blocked  declined or removed (sees nothing)
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- People
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text not null default '' check (char_length(full_name) <= 80),
  avatar_url  text,
  role        text not null default 'pending'
              check (role in ('pending','member','admin','owner','blocked')),
  created_at  timestamptz not null default now(),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz
);

-- Role helpers. SECURITY DEFINER so policies can read roles without recursion.
create or replace function public.my_role() returns text
language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_member() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.my_role() in ('member','admin','owner'), false)
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.my_role() in ('admin','owner'), false)
$$;

-- Every new sign-up gets a profile. The very first person becomes the owner;
-- everyone after that starts as 'pending' until an admin approves them.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  first_owner boolean;
begin
  perform pg_advisory_xact_lock(424242);
  select not exists (select 1 from public.profiles where role = 'owner') into first_owner;
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    left(coalesce(nullif(new.raw_user_meta_data->>'full_name',''),
                  nullif(new.raw_user_meta_data->>'name',''),
                  split_part(coalesce(new.email,''), '@', 1)), 80),
    new.raw_user_meta_data->>'avatar_url',
    case when first_owner then 'owner' else 'pending' end
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated
  using (
    id = auth.uid()
    or public.is_admin()
    or (public.is_member() and role in ('member','admin','owner'))
  );

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- Column-level access: emails stay private (admins get them through
-- admin_list_people below), and people can only change their own name.
revoke all on public.profiles from anon, authenticated;
grant select (id, full_name, avatar_url, role, created_at) on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;

-- Admin view of everyone, including emails and pending requests.
create or replace function public.admin_list_people()
returns table (id uuid, email text, full_name text, avatar_url text, role text,
               created_at timestamptz, reviewed_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then
    raise exception 'Only admins can see the member list' using errcode = '42501';
  end if;
  return query
    select p.id, p.email, p.full_name, p.avatar_url, p.role, p.created_at, p.reviewed_at
    from public.profiles p
    order by p.created_at desc;
end $$;

-- Approve, decline, remove, restore, promote, demote.
--   Admins: pending -> member/blocked, member <-> blocked
--   Owner:  everything admins can do, plus member <-> admin, admin -> blocked
--   Nobody can change the owner or their own role here.
create or replace function public.set_member_role(target uuid, new_role text)
returns void
language plpgsql security definer set search_path = public as $$
declare
  caller text := public.my_role();
  current text;
begin
  if caller not in ('admin','owner') then
    raise exception 'Only admins can change access' using errcode = '42501';
  end if;
  if target = auth.uid() then
    raise exception 'You cannot change your own access' using errcode = '42501';
  end if;
  if new_role not in ('member','admin','blocked') then
    raise exception 'Unknown role %', new_role using errcode = '22023';
  end if;

  select role into current from public.profiles where id = target for update;
  if current is null then
    raise exception 'That person was not found' using errcode = 'P0002';
  end if;
  if current = 'owner' then
    raise exception 'The owner''s access cannot be changed here' using errcode = '42501';
  end if;
  if caller = 'admin' and (current = 'admin' or new_role = 'admin') then
    raise exception 'Only the owner can add or remove admins' using errcode = '42501';
  end if;

  update public.profiles
     set role = new_role, reviewed_by = auth.uid(), reviewed_at = now()
   where id = target;
end $$;

revoke all on function public.admin_list_people() from public, anon;
revoke all on function public.set_member_role(uuid, text) from public, anon;
grant execute on function public.admin_list_people() to authenticated;
grant execute on function public.set_member_role(uuid, text) to authenticated;

-- ---------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 1 and 120),
  title_ta    text not null default '' check (char_length(title_ta) <= 120),
  date        date not null,
  start_time  time,
  end_time    time,
  venue       text not null default '' check (char_length(venue) <= 160),
  contact     text not null default '' check (char_length(contact) <= 120),
  category    text not null default 'celebration'
              check (category in ('celebration','cultural','school','sports','meeting','volunteer','festival','other')),
  description text not null default '' check (char_length(description) <= 4000),
  tentative   boolean not null default false,
  kind        text not null default 'event' check (kind in ('event','festival')),
  status      text not null default 'published' check (status in ('draft','published')),
  slots       jsonb not null default '[]'::jsonb check (jsonb_typeof(slots) = 'array'),
  created_by  uuid references auth.users(id) on delete set null,
  updated_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  check (end_time is null or start_time is null or end_time >= start_time)
);
create index if not exists events_date_idx on public.events (date);

create or replace function public.touch_event() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by);
    new.created_at := now();
  else
    new.created_by := old.created_by;
    new.created_at := old.created_at;
  end if;
  return new;
end $$;

drop trigger if exists events_touch on public.events;
create trigger events_touch before insert or update on public.events
  for each row execute function public.touch_event();

alter table public.events enable row level security;

drop policy if exists events_read on public.events;
create policy events_read on public.events for select to authenticated
  using (public.is_admin() or (public.is_member() and status = 'published'));

drop policy if exists events_admin_write on public.events;
create policy events_admin_write on public.events for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- RSVPs
-- ---------------------------------------------------------------------
create table if not exists public.rsvps (
  event_id   uuid not null references public.events(id) on delete cascade,
  user_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  status     text not null check (status in ('going','maybe','no')),
  guests     int  not null default 0 check (guests between 0 and 20),
  updated_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

alter table public.rsvps enable row level security;

drop policy if exists rsvps_read on public.rsvps;
create policy rsvps_read on public.rsvps for select to authenticated
  using (public.is_member());

drop policy if exists rsvps_insert_own on public.rsvps;
create policy rsvps_insert_own on public.rsvps for insert to authenticated
  with check (
    user_id = auth.uid() and public.is_member()
    and exists (select 1 from public.events e
                where e.id = event_id and e.status = 'published' and e.kind = 'event')
  );

drop policy if exists rsvps_update_own on public.rsvps;
create policy rsvps_update_own on public.rsvps for update to authenticated
  using (user_id = auth.uid() and public.is_member())
  with check (user_id = auth.uid());

drop policy if exists rsvps_delete on public.rsvps;
create policy rsvps_delete on public.rsvps for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------
-- Volunteer sign-ups (roles themselves live in events.slots)
-- ---------------------------------------------------------------------
create table if not exists public.volunteer_signups (
  event_id   uuid not null references public.events(id) on delete cascade,
  slot_id    text not null check (char_length(slot_id) <= 40),
  user_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (event_id, slot_id, user_id)
);

-- Refuse sign-ups for roles that are full or no longer exist.
create or replace function public.check_slot_capacity() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  needed int;
  taken  int;
begin
  perform pg_advisory_xact_lock(hashtext(new.event_id::text || ':' || new.slot_id));
  select (s->>'need')::int into needed
    from public.events e, jsonb_array_elements(e.slots) s
   where e.id = new.event_id and e.status = 'published' and s->>'id' = new.slot_id
   limit 1;
  if needed is null then
    raise exception 'This volunteer role no longer exists' using errcode = 'P0001';
  end if;
  select count(*) into taken from public.volunteer_signups
   where event_id = new.event_id and slot_id = new.slot_id;
  if taken >= needed then
    raise exception 'This volunteer role is full' using errcode = 'P0001';
  end if;
  return new;
end $$;

drop trigger if exists volunteer_capacity on public.volunteer_signups;
create trigger volunteer_capacity before insert on public.volunteer_signups
  for each row execute function public.check_slot_capacity();

alter table public.volunteer_signups enable row level security;

drop policy if exists vol_read on public.volunteer_signups;
create policy vol_read on public.volunteer_signups for select to authenticated
  using (public.is_member());

drop policy if exists vol_insert_own on public.volunteer_signups;
create policy vol_insert_own on public.volunteer_signups for insert to authenticated
  with check (user_id = auth.uid() and public.is_member());

drop policy if exists vol_delete on public.volunteer_signups;
create policy vol_delete on public.volunteer_signups for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------
-- Organizer checklists (admins only)
-- ---------------------------------------------------------------------
create table if not exists public.checklist_items (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references public.events(id) on delete cascade,
  text       text not null check (char_length(text) between 1 and 200),
  done       boolean not null default false,
  done_by    uuid references auth.users(id) on delete set null,
  done_at    timestamptz,
  position   double precision not null default extract(epoch from now()),
  created_at timestamptz not null default now()
);
create index if not exists checklist_event_idx on public.checklist_items (event_id);

alter table public.checklist_items enable row level security;

drop policy if exists checklist_admin on public.checklist_items;
create policy checklist_admin on public.checklist_items for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- Table privileges (row-level security above decides which rows)
-- ---------------------------------------------------------------------
revoke all on public.events, public.rsvps, public.volunteer_signups, public.checklist_items from anon;
grant select, insert, update, delete on public.events, public.rsvps,
  public.volunteer_signups, public.checklist_items to authenticated;

-- ---------------------------------------------------------------------
-- Live updates
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    foreach t in array array['events','rsvps','volunteer_signups','checklist_items'] loop
      begin
        execute format('alter publication supabase_realtime add table public.%I', t);
      exception when duplicate_object then null;
      end;
    end loop;
  end if;
end $$;

-- ---------------------------------------------------------------------
-- Starter festival dates. These are estimates: confirm them against a
-- panchangam and edit them in the app. Delete any you don't want.
-- ---------------------------------------------------------------------
insert into public.events (title, title_ta, date, kind, category, tentative, status)
select v.title, v.title_ta, v.date::date, 'festival', 'festival', true, 'published'
from (values
  ('Saraswati Pooja',           'சரஸ்வதி பூஜை',        '2026-10-19'),
  ('Deepavali',                 'தீபாவளி',             '2026-11-08'),
  ('Karthigai Deepam',          'கார்த்திகை தீபம்',      '2026-11-24'),
  ('Thai Pongal',               'தைப் பொங்கல்',         '2027-01-15'),
  ('Thiruvalluvar Day',         'திருவள்ளுவர் தினம்',    '2027-01-16'),
  ('Tamil New Year (Puthandu)', 'தமிழ்ப் புத்தாண்டு',    '2027-04-14')
) as v(title, title_ta, date)
where not exists (
  select 1 from public.events e where e.title = v.title and e.date = v.date::date
);
