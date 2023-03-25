create table calendar(
    calendar_id number(19, 0) not null,
    name        varchar(255) not null,
    public      boolean default false,
    constraint pk_calendar primary key (calendar_id)
);

create table member(
    member_id  number(19, 0) not null,
    first_name  varchar(255) not null,
    last_name   varchar(255) not null,
    username    varchar(255) not null,
    date_joined timestamp not null,
    constraint pk_member primary key (member_id)
);

create table calendar_member(
    calendar_member_id number(19, 0) not null,
    member_id          number(19, 0) not null,
    calendar_id        number(19, 0) not null,
    is_owner           boolean default false,
    auto_subscribed    boolean default false,
    constraint pk_calendar_member primary key (calendar_member_id),
    constraint fk_calendar_member_calendar foreign key (calendar_id) references calendar (calendar_id),
    constraint fk_calendar_member_member foreign key (member_id) references member (member_id)
);

create table event(
    event_id    number(19, 0) not null,
    calendar_id number(19, 0) not null,
    name        varchar(255) not null,
    start_time  timestamp not null,
    end_time    timestamp not null,
    constraint pk_event primary key (event_id),
    constraint fk_event_calendar foreign key (calendar_id) references calendar (calendar_id)
);

create table event_subscriber(
    event_subscriber_id number(19, 0) not null,
    event_id            number(19, 0) not null,
    subscriber_id       number(19, 0) not null,
    constraint pk_event_subscriber primary key (event_subscriber_id),
    constraint fk_event_subscriber_event foreign key (event_id) references event (event_id),
    constraint fk_event_subscriber_member foreign key (subscriber_id) references member (member_id)
);

create sequence common_db_sequence
    start with 100
    increment by 1