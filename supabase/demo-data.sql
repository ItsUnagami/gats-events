-- GATS Events: sample data for demos. Run in Supabase > SQL Editor.
-- Adds 8 sample events (dates count from today), RSVPs, volunteer sign-ups and checklists
-- from the accounts that already exist. Remove it all with remove-demo-data.sql.
do $$
declare
  o uuid; s uuid; m uuid;
  e1 uuid; e2 uuid; e3 uuid; e4 uuid; e5 uuid; e6 uuid; e7 uuid; e8 uuid;
  tag text := E'\n\n(Sample event for the demo)';
begin
  select id into o from profiles where role = 'owner' order by created_at limit 1;
  select id into s from profiles where email = 'sukshrestha@gmail.com';
  select id into m from profiles where id not in (o, coalesce(s, o)) and role in ('admin','member') order by created_at limit 1;

  insert into events (title, title_ta, date, start_time, end_time, venue, contact, category, description, slots, created_by, updated_by)
  values ('Deepavali Family Night', 'தீபாவளி குடும்ப இரவு', current_date + 6, '17:30', '21:00', 'Duluth Community Hall', 'Events team', 'celebration',
    'Lamps, sweets, a kids'' cultural show and dinner. Bring the whole family!' || tag,
    '[{"id":"d1-setup","name":"Setup","need":4},{"id":"d1-food","name":"Food serving","need":4},{"id":"d1-reg","name":"Registration desk","need":2},{"id":"d1-clean","name":"Cleanup","need":3}]', o, o)
  returning id into e1;

  insert into events (title, date, start_time, venue, category, description, slots, created_by, updated_by)
  values ('GATS Cricket Tournament', current_date + 3, '08:30', 'Pinckneyville Park', 'sports',
    'Friendly matches for kids and adults. Teams are picked on the day.' || tag,
    '[{"id":"d3-score","name":"Scorekeeper","need":2},{"id":"d3-water","name":"Water and snacks","need":2}]', o, o)
  returning id into e3;

  insert into events (title, title_ta, date, start_time, end_time, venue, category, description, slots, created_by, updated_by)
  values ('Kids Thirukkural Competition', 'குழந்தைகள் திருக்குறள் போட்டி', current_date + 13, '14:00', '16:30', 'Gwinnett Library Auditorium', 'school',
    'Recite your favourite kurals. Prizes for every age group.' || tag,
    '[{"id":"d2-judge","name":"Judges'' helpers","need":2},{"id":"d2-snack","name":"Snacks","need":2}]', o, o)
  returning id into e2;

  insert into events (title, date, start_time, end_time, venue, category, description, created_by, updated_by)
  values ('Pongal Planning Meeting', current_date + 20, '19:00', '20:00', 'Zoom', 'meeting',
    'Plan the Pongal celebration: venue, food and the cultural program.' || tag, o, o)
  returning id into e4;

  insert into events (title, title_ta, date, start_time, end_time, venue, category, description, tentative, created_by, updated_by)
  values ('Kolam Workshop', 'கோலம் பயிற்சி', current_date + 27, '10:00', '12:00', 'Community Hall, Room 2', 'cultural',
    'Learn simple kolam patterns with chalk and rice flour.' || tag, true, o, o)
  returning id into e5;

  insert into events (title, date, start_time, end_time, venue, category, description, slots, created_by, updated_by)
  values ('Volunteer Day at the Food Bank', current_date + 34, '09:00', '12:00', 'Atlanta Community Food Bank', 'volunteer',
    'Help pack food boxes for families in need. Ages 10 and up.' || tag,
    '[{"id":"d6-pack","name":"Packing team","need":8}]', o, o)
  returning id into e6;

  insert into events (title, date, venue, category, description, status, created_by, updated_by)
  values ('New Year Picnic', current_date + 45, '', 'other', 'Still being planned, so only admins can see it.' || tag, 'draft', o, o)
  returning id into e7;

  insert into events (title, date, start_time, end_time, venue, category, description, created_by, updated_by)
  values ('Navaratri Golu Visit', current_date - 12, '18:00', '20:00', 'Member homes', 'cultural',
    'Visiting golu displays together.' || tag, o, o)
  returning id into e8;

  -- RSVPs (going counts the person plus their guests)
  insert into rsvps (event_id, user_id, status, guests) values (e1, o, 'going', 3), (e3, o, 'going', 1), (e2, o, 'maybe', 0);
  if s is not null then insert into rsvps (event_id, user_id, status, guests) values (e1, s, 'going', 2), (e3, s, 'going', 0), (e6, s, 'going', 0), (e4, s, 'no', 0); end if;
  if m is not null then insert into rsvps (event_id, user_id, status, guests) values (e1, m, 'going', 1), (e2, m, 'going', 2), (e5, m, 'maybe', 0); end if;

  -- Volunteer sign-ups
  insert into volunteer_signups (event_id, slot_id, user_id) values (e1, 'd1-setup', o), (e3, 'd3-water', o);
  if s is not null then insert into volunteer_signups (event_id, slot_id, user_id) values (e1, 'd1-reg', s), (e3, 'd3-score', s); end if;
  if m is not null then insert into volunteer_signups (event_id, slot_id, user_id) values (e1, 'd1-food', m), (e2, 'd2-snack', m); end if;

  -- Checklists (admins only)
  insert into checklist_items (event_id, text, done, done_by, done_at, position) values
    (e1, 'Book the venue', true, o, now(), 1), (e1, 'Confirm food and caterer', true, o, now(), 2),
    (e1, 'Send the announcement to members', true, coalesce(s, o), now(), 3), (e1, 'Arrange sound and stage', false, null, null, 4),
    (e1, 'Fill the volunteer roles', false, null, null, 5), (e1, 'Plan setup and cleanup', false, null, null, 6),
    (e3, 'Reserve the cricket ground', true, o, now(), 1), (e3, 'Bring bats, balls and stumps', false, null, null, 2),
    (e3, 'First-aid kit', false, null, null, 3);
end $$;
