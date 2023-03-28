drop database if exists easy_packing;
create database easy_packing;
use easy_packing;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

create table location (
	location_id int primary key auto_increment,
    street_address varchar(255),
    city varchar(50),
    zip varchar(20),
    state varchar(2),
    country varchar(50)
);

create table `event` (
	event_id int primary key auto_increment,
    event_name varchar(50),
    event_type bit not null,
    start_date varchar(50),
    end_date varchar(50), 
    app_user_id int not null,
    start_location_id int not null,
    end_location_id int not null,
    constraint fk_event_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_event_start_location_id
		foreign key (start_location_id)
        references location(location_id),
	constraint fk_event_end_location_id
		foreign key (end_location_id)
        references location(location_id)
);

create table todo(
	todo_id int primary key auto_increment,
    todo_date varchar(50),
    todo_name varchar(50),
    todo_description varchar(255),
    todo_status bit,
    event_id int not null,
    constraint fk_todo_event_id
		foreign key (event_id)
        references `event`(event_id)
);

create table container (
	container_id int primary key auto_increment,
    parent_container_id int,
    container_name varchar(50),
    event_id int not null,
     constraint fk_container_event_id
		foreign key (event_id)
        references `event`(event_id)
);

create table item(
	item_id int primary key auto_increment,
    item_name varchar(50),
    pack_status bit,
    quantity int not null,
    `description` varchar(50),
    app_user_id int not null,
    container_id int not null,
    constraint fk_item_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_item_container_id
		foreign key (container_id)
        references container(container_id)
);

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 2),
    (2, 1);
