insert into member(member_id, first_name, last_name, username, password, date_joined) values (1, 'John', 'Doe', 'johndoe', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-02-21 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (2, 'Alice', 'Smith', 'smithy', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-02-27 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (3, 'David', 'Schmidt', 'dschmidt', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-01 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (4, 'Harrison', 'Barnes', 'barnesnoble', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-01 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (5, 'Giles', 'McAfee', 'othermcafee', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-01 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (6, 'Curt', 'Reyer', 'creyer', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-02 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (7, 'Howard', 'Van Aalst', 'hvagon', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-02 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (8, 'Vincent', 'Jérôme', 'vinny', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-02 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (9, 'Hoyt', 'Dreessen', 'hoytdree', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-03 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (10, 'Amanda', 'Parks', 'parksnrec', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-05 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (11, 'Charity', 'Forrest', 'runcharity', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-05 00:00:00');
insert into member(member_id, first_name, last_name, username, password, date_joined) values (12, 'Heidi', 'Kappel', 'heidikapp', '$2a$13$EcMkFjTT4MQfWuZ1G1GEUuBZMzu6XiBl7961VJjxAUbr.i8HqBiqi', '2023-03-07 00:00:00');

insert into calendar(calendar_id, name, public) values (1, 'My Calendar', true);
insert into calendar(calendar_id, name, public) values (2, 'Family', true);
insert into calendar(calendar_id, name, public) values (3, 'Uni', true);
insert into calendar(calendar_id, name, public) values (4, 'Concerts', true);
insert into calendar(calendar_id, name, public) values (5, 'DnD', true);
insert into calendar(calendar_id, name, public) values (6, 'Work', true);
insert into calendar(calendar_id, name, public) values (7, 'Birthdays', true);
insert into calendar(calendar_id, name, public) values (8, 'Personal', true);
insert into calendar(calendar_id, name, public) values (9, 'Test calendar', true);
insert into calendar(calendar_id, name, public) values (10, 'My calendar', true);
insert into calendar(calendar_id, name, public) values (11, 'My calendar', true);
insert into calendar(calendar_id, name, public) values (12, 'Family', true);
insert into calendar(calendar_id, name, public) values (13, 'My calendar', true);
insert into calendar(calendar_id, name, public) values (14, 'My Calendar', true);
insert into calendar(calendar_id, name, public) values (15, 'Witty calendar name', true);
insert into calendar(calendar_id, name, public) values (16, 'My Calendar', true);
insert into calendar(calendar_id, name, public) values (17, 'Heidi''s calendar', true);

insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (1, 1, 2, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (2, 1, 1, true, false);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (3, 2, 1, false, false);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (4, 2, 2, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (5, 3, 2, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (6, 2, 3, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (7, 2, 4, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (8, 2, 5, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (9, 2, 6, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (10, 2, 7, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (11, 4, 2, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (12, 5, 2, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (13, 11, 2, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (14, 11, 2, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (15, 7, 3, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (16, 8, 3, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (17, 9, 3, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (18, 12, 3, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (19, 4, 3, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (20, 3, 8, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (21, 4, 9, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (22, 5, 11, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (23, 6, 11, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (24, 7, 12, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (25, 7, 13, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (26, 9, 12, false, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (27, 8, 13, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (28, 9, 14, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (29, 11, 15, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (30, 11, 16, true, true);
insert into calendar_member(calendar_member_id, member_id, calendar_id, is_owner, auto_subscribed) values (31, 12, 17, true, true);

insert into event(event_id, calendar_id, name, start_time, end_time) values (1, 1, 'Dentist appointment', '2023-03-01 12:00:00', '2023-03-01 13:00:00');
insert into event(event_id, calendar_id, name, start_time, end_time) values (2, 1, 'Check stove', '2023-03-02 13:00:00', '2023-03-02 14:00:00');
insert into event(event_id, calendar_id, name, start_time, end_time) values (3, 2, 'Katie''s birthday', '2023-03-03 12:00:00', '2023-03-03 12:00:00');
insert into event(event_id, calendar_id, name, start_time, end_time) values (4, 2, 'BBQ at Mom and Pop''s', '2023-03-04 11:00:00', '2023-03-04 12:00:00');

insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (1, 1, 1);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (2, 1, 2);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (3, 2, 1);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (4, 3, 1);
insert into event_subscriber(event_subscriber_id, event_id, subscriber_id) values (5, 4, 1);

insert into friend_request(request_id, sender_id, receiver_id, accepted) values (1, 1, 2, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (2, 1, 3, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (3, 3, 2, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (4, 6, 2, false);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (5, 7, 2, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (6, 2, 5, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (7, 2, 8, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (8, 2, 9, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (9, 2, 11, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (10, 11, 2, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (11, 2, 12, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (12, 4, 5, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (13, 4, 11, false);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (14, 5, 8, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (15, 7, 9, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (16, 11, 5, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (17, 11, 4, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (18, 11, 1, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (19, 11, 11, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (20, 11, 1, true);
insert into friend_request(request_id, sender_id, receiver_id, accepted) values (21, 11, 5, true);

insert into notification(notification_id, notify_time, member_id, event_id) values (1, '2023-03-01 12:00:00', 1, 1);
insert into notification(notification_id, notify_time, member_id, event_id) values (2, '2023-03-02 13:00:00', 1, 2);
insert into notification(notification_id, notify_time, member_id, event_id) values (3, '2023-03-03 12:00:00', 1, 3);