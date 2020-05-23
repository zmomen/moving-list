--/usr/local/mysql/bin/mysql -uroot -p

USE todos;
DROP DATABASE todos;
create DATABASE todos;
USE todos;

DROP table todo_category;
create TABLE todo_category (
    id INT auto_increment,
    category VARCHAR(40) NOT NULL,
    PRIMARY KEY(id));

DROP TABLE todo;
create TABLE todo (
    id INT auto_increment, 
    category_id INT NOT NULL, 
    title VARCHAR(50) NOT NULL, 
    DESCRIPTION VARCHAR(50), 
    completed BOOLEAN,
    created_dt DATE,
    modified_dt DATE,
    PRIMARY KEY(id),
    CONSTRAINT fk_categorytodo FOREIGN KEY (category_id)
    REFERENCES todo_category(id));

ALTER TABLE todo MODIFY COLUMN DESCRIPTION TEXT;
