
CREATE DATABASE shop_back;

\c shop_back

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO roles(name) VALUES('admin');
INSERT INTO roles(name) VALUES('audience');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id INTEGER NOT NULL,
    created_date TIMESTAMP NOT NULL,
    modified_date TIMESTAMP NOT NULL
);

ALTER TABLE users ADD CONSTRAINT fk_users_role_id FOREIGN KEY (role_id) REFERENCES roles (id);
CREATE UNIQUE INDEX idx_users_user_name ON users(user_name);

INSERT INTO users(id, user_name, password, role_id, created_date, modified_date) VALUES (-1, 'anonymous', '', 2, NOW(), NOW());
INSERT INTO users(user_name, password, role_id, created_date, modified_date)
VALUES ('admin', 'admin', 1, NOW(), NOW());

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    user_id INTEGER NOT NULL,
    created_date TIMESTAMP NOT NULL,
    modified_date TIMESTAMP NOT NULL 
);

CREATE UNIQUE INDEX idx_events_code ON events(code);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    description VARCHAR(1000),
    event_id INTEGER  NOT NULL,
    is_highlighted BOOLEAN NOT NULL,
    is_shown BOOLEAN NOT NULL,
    created_date TIMESTAMP NOT NULL,
    modified_date TIMESTAMP NOT NULL
);

ALTER TABLE questions ADD CONSTRAINT fk_questions_event_id FOREIGN KEY (event_id) REFERENCES events (id);

CREATE TABLE user_actions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    action_name VARCHAR(100),
    question_id INTEGER NOT NULL,
    created_date TIMESTAMP NOT NULL
);

ALTER TABLE user_actions ADD CONSTRAINT fk_user_actions_user_id FOREIGN KEY (user_id) REFERENCES users (id);
