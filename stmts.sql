DROP DATABASE IF EXISTS todos;
create DATABASE todos;
USE todos;

DROP table IF EXISTS todo_category;
create TABLE todo_category (
    id INT auto_increment,
    category VARCHAR(40) NOT NULL,
    PRIMARY KEY(id));

DROP TABLE IF EXISTS todo;
create TABLE todo (
    id INT auto_increment, 
    category_id INT NOT NULL, 
    title VARCHAR(50) NOT NULL, 
    DESCRIPTION VARCHAR(50), 
    completed BOOLEAN,
    created_dt DATETIME,
    modified_dt DATETIME,
    PRIMARY KEY(id),
    CONSTRAINT fk_categorytodo FOREIGN KEY (category_id)
    REFERENCES todo_category(id));

ALTER TABLE todo MODIFY COLUMN DESCRIPTION TEXT;
ALTER TABLE todo CHANGE CREATED_DT DUE_DT DATETIME;
