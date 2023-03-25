insert into member(member_id, first_name, last_name, username, date_joined) values (0, 'John', 'Doe', 'johndoe', '2023-02-21 00:00:00');
insert into member(member_id, first_name, last_name, username, date_joined) values (1, 'Alice', 'Smith', 'smithy', '2023-02-27 00:00:00');
insert into member(member_id, first_name, last_name, username, date_joined) values (2, 'David', 'Schmidt', 'dschmidt', '2023-03-01 00:00:00');

insert into calendar(calendar_id, name, public) values (0, 'My Calendar', true);
insert into calendar(calendar_id, name, public) values (1, 'Family', true);
insert into calendar(calendar_id, name, public) values (2, 'Uni', true);
insert into calendar(calendar_id, name, public) values (3, 'Concerts', true);
insert into calendar(calendar_id, name, public) values (4, 'DnD', true);
insert into calendar(calendar_id, name, public) values (5, 'La Famiglia', true);
insert into calendar(calendar_id, name, public) values (6, 'Birthdays', true);

insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (0, 0, 1, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (1, 0, 0, false, false);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (2, 1, 0, true, false);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (3, 1, 1, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (4, 2, 1, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (5, 1, 2, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (6, 1, 3, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (7, 1, 4, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (8, 1, 5, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (9, 1, 6, true, true);

insert into event(event_id, calendar_id, name, start_time, end_time) values (0, 0, 'Dentist appointment', '2023-03-01 12:00:00', '2023-03-01 13:00:00');
insert into event(event_id, calendar_id, name, start_time, end_time) values (1, 0, 'Check stove', '2023-03-02 13:00:00', '2023-03-02 14:00:00');
insert into event(event_id, calendar_id, name, start_time, end_time) values (2, 1, 'Katie''s birthday', '2023-03-03 12:00:00', '2023-03-03 12:00:00');
insert into event(event_id, calendar_id, name, start_time, end_time) values (3, 1, 'BBQ at Mom and Pop''s', '2023-03-04 11:00:00', '2023-03-04 12:00:00');

insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (0, 0, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (1, 0, 1);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (2, 1, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (3, 2, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (4, 3, 0);

