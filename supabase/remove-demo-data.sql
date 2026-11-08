-- GATS Events: remove the sample data added by demo-data.sql. Run in Supabase > SQL Editor.
-- Only touches events whose details end with "(Sample event for the demo)".
with demo as (select id from events where description like '%(Sample event for the demo)')
, a as (delete from checklist_items where event_id in (select id from demo))
, b as (delete from volunteer_signups where event_id in (select id from demo))
, c as (delete from rsvps where event_id in (select id from demo))
delete from events where id in (select id from demo);
