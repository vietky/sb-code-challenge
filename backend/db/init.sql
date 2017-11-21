
CREATE TABLE roles (
    id INTEGER,
    name VARCHAR(100)
);

CREATE TABLE users (
    id INTEGER,
    user_name VARCHAR(100),
    password VARCHAR(100),
    role_id INTEGER,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
);

CREATE TABLE events (
    id INTEGER,
    code VARCHAR(100),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_date TIMESTAMP,
    modified_date TIMESTAMP    
);

CREATE TABLE questions (
    id INTEGER,
    description VARCHAR(1000),
    event_id INTEGER,
    created_date TIMESTAMP,
    modified_date TIMESTAMP    
);

CREATE TABLE user_actions (
    id INTEGER,
    user_id INTEGER,
    action_name VARCHAR(100),
    question_id INTEGER
);