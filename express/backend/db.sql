-- CREATE TABLE admins (
--     username VARCHAR(50) PRIMARY KEY,
--     password VARCHAR(255) NOT NULL
-- );

CREATE TABLE students (
    nrp VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    email VARCHAR(100) NOT NULL,
    birthdate VARCHAR(10)
);
