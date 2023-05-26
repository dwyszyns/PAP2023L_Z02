delete from friend_request;
delete from event_subscriber;
delete from calendar_member;
delete from event;
delete from member;
delete from calendar;
delete from notifications;


insert into member(member_id, first_name, last_name, username, password, date_joined) values (0, 'John', 'Doe', 'johndoe', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-02-21 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (1, 'Alice', 'Smith', 'smithy', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-02-27 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (2, 'David', 'Schmidt', 'dschmidt', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-01 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (3, 'Harrison', 'Barnes', 'barnesnoble', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-01 00:00:00');


insert into calendar(calendar_id, name, public) values (0, 'My Calendar', true);
insert into calendar(calendar_id, name, public) values (1, 'Family', true);

insert into calendar_member(calendar_member_id, member_id, calendar_id, role, auto_subscribed) values (0, 0, 1, 'owner', 1);
insert into calendar_member(calendar_member_id, member_id, calendar_id, role, auto_subscribed) values (1, 0, 0, 'guest', 0);
insert into calendar_member(calendar_member_id, member_id, calendar_id, role, auto_subscribed) values (2, 1, 0, 'owner', 0);
insert into calendar_member(calendar_member_id, member_id, calendar_id, role, auto_subscribed) values (3, 1, 1, 'guest', 1);
insert into calendar_member(calendar_member_id, member_id, calendar_id, role, auto_subscribed) values (4, 2, 1, 'guest', 1);

insert into event(event_id, calendar_id, name, start_time, duration) values (0, 0, 'Dentist appointment', '2023-03-01 12:00:00', 60);
insert into event(event_id, calendar_id, name, start_time, duration) values (1, 0, 'Check stove', '2023-03-02 13:00:00', 120);
insert into event(event_id, calendar_id, name, start_time, duration) values (2, 1, 'Katie''s birthday', '2023-03-03 12:00:00', 120);
insert into event(event_id, calendar_id, name, start_time, duration) values (3, 1, 'BBQ at Mom and Pop''s', '2023-03-04 11:00:00', 60);

insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (0, 0, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (1, 0, 1);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (2, 1, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (3, 2, 0);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (4, 3, 0);

insert into friend_request(request_id, sender_id, receiver_id, accepted) values (0, 0, 1, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (1, 0, 2, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (2, 2, 1, true);

insert into event_seq(seq_id, next_val) values (0, 100);
insert into event_subscriber_seq(seq_id, next_val) values (0, 100);