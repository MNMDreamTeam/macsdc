CREATE DATABASE questionsapi;

CREATE SCHEMA qa;

SET search_path TO qa;

CREATE TABLE IF NOT EXISTS questions (
 id serial PRIMARY KEY,
 product_id int NOT NULL,
 body varchar(500),
 date_written date,
 asker_name varchar(200),
 asker_email varchar(200),
 reported char,
 helpful int);

CREATE TABLE IF NOT EXISTS answers (
 id serial PRIMARY KEY,
 question_id int REFERENCES questions(id),
 body VARCHAR(1500),
 date_written DATE,
 answerer_name VARCHAR(300),
 answerer_email VARCHAR(180),
 reported CHAR,
 helpful int);

CREATE TABLE IF NOT EXISTS answers_photos (
id serial PRIMARY KEY,
answer_id int REFERENCES answers(id),
url VARCHAR(400));


COPY qa.questions(id, product_id, body, date_written, asker_name, asker_email,reported, helpful)
FROM '/Users/mcolligan/FEC/projectGreenfieldII/csvData/questions.csv' DELIMITER ',' CSV HEADER;

COPY qa.answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/mcolligan/FEC/projectGreenfieldII/csvData/answers.csv' DELIMITER ',' CSV HEADER;

COPY qa.answers_photos(id, answer_id, url)
FROM '/Users/mcolligan/FEC/projectGreenfieldII/csvData/answers_photos.csv' DELIMITER ',' CSV HEADER;
