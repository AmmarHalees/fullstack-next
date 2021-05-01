-- Up
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
);

-- INSERT INTO Person (name, email) values ('bruno', 'bruno@antunes.pt');
-- INSERT INTO Person (name, email) values ('jack', 'jack@antunes.pt');

-- Down
DROP TABLE Person;
