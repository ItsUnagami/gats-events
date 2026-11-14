-- =====================================================================
-- GATSapp: upgrade 2 (team chat for admins and the owner)
-- Run this once in Supabase > SQL Editor, after schema.sql.
-- It is safe to run more than once.
-- =====================================================================

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  body       text not null check (char_length(btrim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index if not exists messages_created_idx on public.messages (created_at);

-- Nobody can backdate a message or post as someone else.
create or replace function public.stamp_message() returns trigger
language plpgsql set search_path = public as $$
begin
  new.created_at := now();
  new.user_id := auth.uid();
  return new;
end $$;

drop trigger if exists messages_stamp on public.messages;
create trigger messages_stamp before insert on public.messages
  for each row execute function public.stamp_message();

alter table public.messages enable row level security;

-- Only admins and the owner can read or post.
drop policy if exists messages_read on public.messages;
create policy messages_read on public.messages for select to authenticated
  using (public.is_admin());

drop policy if exists messages_post on public.messages;
create policy messages_post on public.messages for insert to authenticated
  with check (public.is_admin() and user_id = auth.uid());

-- People can delete their own messages; the owner can delete any.
drop policy if exists messages_delete on public.messages;
create policy messages_delete on public.messages for delete to authenticated
  using (public.is_admin() and (user_id = auth.uid() or public.my_role() = 'owner'));

revoke all on public.messages from anon;
grant select, insert, delete on public.messages to authenticated;

-- Live updates for the chat
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin
      alter publication supabase_realtime add table public.messages;
    exception when duplicate_object then null;
    end;
  end if;
end $$;
