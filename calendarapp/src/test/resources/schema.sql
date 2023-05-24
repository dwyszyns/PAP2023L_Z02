create table calendar(
    calendar_id identity not null,
    name        varchar(255) not null,
    public      number(1,0) default false,
    constraint pk_calendar primary key (calendar_id)
);

create table member(
    member_id  identity not null,
    first_name  varchar(255) not null,
    last_name   varchar(255) not null,
    username    varchar(255) not null,
    password    varchar(255) not null,
    date_joined timestamp not null,
    constraint pk_member primary key (member_id)
);

create table calendar_member(
    calendar_member_id identity not null,
    member_id          number(19, 0) not null,
    calendar_id        number(19, 0) not null,
    role               varchar(20) not null,
    auto_subscribed    number(1,0) default false,
    constraint pk_calendar_member primary key (calendar_member_id),
    constraint fk_calendar_member_calendar foreign key (calendar_id) references calendar (calendar_id),
    constraint fk_calendar_member_member foreign key (member_id) references member (member_id)
);

create table event(
    event_id    identity not null,
    calendar_id number(19, 0) not null,
    name        varchar(255) not null,
    start_time  timestamp not null,
    duration    int not null,
    constraint pk_event primary key (event_id),
    constraint fk_event_calendar foreign key (calendar_id) references calendar (calendar_id)
);

create table event_subscriber(
    event_subscriber_id identity not null,
    event_id            number(19, 0) not null,
    subscriber_id       number(19, 0) not null,
    constraint pk_event_subscriber primary key (event_subscriber_id),
    constraint fk_event_subscriber_event foreign key (event_id) references event (event_id),
    constraint fk_event_subscriber_member foreign key (subscriber_id) references member (member_id)
);

create table friend_request(
    request_id  identity not null,
    sender_id   number(19, 0) not null,
    receiver_id number(19, 0) not null,
    accepted    number(1,0) not null default false,
    constraint pk_friend_request primary key (request_id),
    constraint fk_friend_sender foreign key (sender_id) references member (member_id),
    constraint fk_friend_receiver foreign key (receiver_id) references member (member_id)
);


create table join_request(
    request_id  identity not null,
    sender_id   number(19, 0) not null,
    receiver_id number(19, 0) not null,
    calendar_id number(19, 0) not null,
    from_owner  number(1,0) not null default false,
    constraint pk_join_request primary key (request_id),
    constraint fk_join_sender foreign key (sender_id) references member (member_id),
    constraint fk_join_receiver foreign key (receiver_id) references member (member_id),
    constraint fk_join_calendar foreign key (calendar_id) references calendar (calendar_id)
);

create table event_seq(
    seq_id     number(19, 0) not null,
    next_val   number(19, 0) not null,
    constraint pk_event_seq primary key (seq_id)
);

create table event_subscriber_seq(
    seq_id     number(19, 0) not null,
    next_val   number(19, 0) not null,
    constraint pk_subscriber_event_seq primary key (seq_id)
);