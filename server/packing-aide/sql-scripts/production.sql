drop database if exists easy_packing;
create database easy_packing;
use easy_packing;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
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

-- create table location (
-- 	location_id int primary key auto_increment,
--     street_address varchar(255),
--     city varchar(50),
--     zip varchar(20),
--     state varchar(2),
--     country varchar(50)
-- );

create table `event` (
	event_id int primary key auto_increment,   
    event_name varchar(50),
    event_type bit not null,
    start_date varchar(50),
    end_date varchar(50), 
    app_user_id int not null,
    start_location_id int,
    start_location_type varchar(255),
    end_location_id int,
    end_location_type varchar(255),
    constraint fk_event_user_id
        foreign key (app_user_id)
        references app_user(app_user_id)
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
insert into app_user (username, password_hash, disabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

insert into app_user_role
    values
    (1, 1),
    (2, 1);

insert into `event` (event_name, event_type, start_date, end_date, app_user_id, start_location_id, start_location_type, end_location_id, end_location_type) values
		('Springbreak', 1, '2022-04-15', '2022-04-30', 1, 1, 'test', 3, 'test'),
		('First House', 0, '2023-02-01', '2023-02-01', 2, 2, 'test', 1, 'test');
    
	insert into container (parent_container_id, container_name, event_id) values
		(null, 'Kitchen', 2),
        (1, 'Silverware', 2),
        (null, 'Blue Luggage', 1),
        (3, 'Shoe bag', 1); 
    
	insert into item (item_name, pack_status, quantity, `description`, app_user_id, container_id) values
		('Spoon', 0, 400, 'Wish I had more spoons', 2, 2),
        ('Fork', 1, 1, 'My favorite fork', 2, 2),
        ('Shoes', 1, 3, 'Nike runners, Brown dress shoes, Black boots', 1, 4);
    
    insert into todo (todo_date, todo_name, todo_description, todo_status, event_id) values
		('2022-04-16', 'Beach Day', 'go to the beach at 12pm', 0, 1),
        ('2022-04-17', 'Sightseeing', 'Head to townsquare to begin tour', 0, 1),
        ('2023-02-01', 'Unload truck', 'Place all boxes in their assigned rooms', 1, 2);
        
select * from `event`