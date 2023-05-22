create table if not exists calendar(
    calendar_id bigint not null auto_increment,
    name        varchar(255) not null,
    public      boolean default false,
    primary key pk_calendar (calendar_id)
);

create table if not exists member(
    member_id   bigint not null auto_increment,
    first_name  varchar(255) not null,
    last_name   varchar(255) not null,
    username    varchar(255) not null,
    password    varchar(255) not null,
    date_joined timestamp not null,
    primary key pk_member (member_id)
);

create table if not exists calendar_member(
    calendar_member_id bigint not null auto_increment,
    member_id          bigint not null,
    calendar_id        bigint not null,
    is_owner           boolean default false,
    auto_subscribed    boolean default false,
    primary key pk_calendar_member (calendar_member_id),
    foreign key fk_calendar_member_calendar (calendar_id) references calendar (calendar_id),
    foreign key fk_calendar_member_member (member_id) references member (member_id)
);

create table if not exists event(
    event_id    bigint not null auto_increment,
    calendar_id bigint not null,
    name        varchar(255) not null,
    start_time  timestamp not null,
    end_time    timestamp not null,
    primary key pk_event (event_id),
    foreign key fk_event_calendar (calendar_id) references calendar (calendar_id)
);

create table if not exists event_subscriber(
    event_subscriber_id bigint not null auto_increment,
    event_id            bigint not null,
    subscriber_id       bigint not null,
    primary key pk_event_subscriber (event_subscriber_id),
    foreign key fk_event_subscriber_event (event_id) references event (event_id),
    foreign key fk_event_subscriber_member (subscriber_id) references member (member_id)
);

create table if not exists friend_request(
    request_id  bigint not null auto_increment,
    sender_id   bigint not null,
    receiver_id bigint not null,
    accepted    boolean not null default false,
    primary key pk_friend_request (request_id),
    foreign key fk_friend_sender (sender_id) references member (member_id),
    foreign key fk_friend_receiver (receiver_id) references member (member_id)
);

create table if not exists notification(
    notification_id bigint not null auto_increment,
    notify_time     timestamp not null,
    member_id       bigint not null,
    event_id        bigint not null,
    constraint pk_notification primary key (notification_id),
    constraint fk_member foreign key (member_id) references member (member_id),
    constraint fk_event foreign key (event_id) references event (event_id)
);