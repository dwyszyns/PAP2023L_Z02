insert into member(member_id, first_name, last_name, username) values (0, 'John', 'Doe', 'johndoe');
insert into member(member_id, first_name, last_name, username) values (1, 'Alice', 'Smith', 'smithy');
insert into member(member_id, first_name, last_name, username) values (2, 'David', 'Schmidt', 'dschmidt');

insert into calendar(calendar_id, "name") values (0, 'My Calendar');
insert into calendar(calendar_id, "name") values (1, 'Family');

insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (0, 0, 1, 1, 1);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (1, 0, 0, 0, 0);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (2, 1, 0, 1, 0);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (3, 1, 1, 0, 1);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (4, 2, 1, 0, 1);

insert into event(event_id, calendar_id, "name", start_time, end_time) values (0, 0, 'Dentist appointment', 1677628800000, 1677672000000);
insert into event(event_id, calendar_id, "name", start_time, end_time) values (1, 0, 'Check stove', 1677715200000, 1677758400000);
insert into event(event_id, calendar_id, "name", start_time, end_time) values (2, 1, 'Katie''s birthday', 1677628800000, 1677672000000);
insert into event(event_id, calendar_id, "name", start_time, end_time) values (3, 1, 'BBQ at Mom and Pop''s', 1677715200000, 1677758400000);

insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (0, 0, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (1, 0, 1);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (2, 1, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (3, 2, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (4, 3, 0);

