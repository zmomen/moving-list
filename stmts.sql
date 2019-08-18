/usr/local/mysql/bin/mysql -uroot -p

USE todos;
DROP DATABASE todos;
CREATE DATABASE todos;
USE todos;

CREATE TABLE todo_category (
    id INT auto_increment,
    category VARCHAR(40) NOT NULL,
    PRIMARY KEY(id));

CREATE TABLE todo (
    id INT auto_increment, 
    category_id INT NOT NULL, 
    title VARCHAR(50) NOT NULL, 
    DESCRIPTION VARCHAR(50), 
    created_dt DATE,
    PRIMARY KEY(id), 
    CONSTRAINT fk_categorytodo FOREIGN KEY (category_id)
    REFERENCES todo_category(id));

ALTER TABLE todo ADD COLUMN completed BOOLEAN;

