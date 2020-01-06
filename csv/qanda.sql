CREATE DATABASE questionsapi;

CREATE SCHEMA qa;

SET search_path TO qa;

\c questionsapi;

CREATE TABLE IF NOT EXISTS questions (
 question_id serial PRIMARY KEY,
 product_id int NOT NULL,
 question_body varchar(500),
 question_date date,
 asker_name varchar(200),
 asker_email varchar(200),
 reported char,
 question_helpfulness int);

CREATE TABLE IF NOT EXISTS answers (
 answer_id serial PRIMARY KEY,
 question_id int REFERENCES questions(id),
 body VARCHAR(1500),
 date DATE,
 answerer_name VARCHAR(300),
 answerer_email VARCHAR(180),
 reported CHAR,
 helpfulness int);

CREATE TABLE IF NOT EXISTS answers_photos (
id serial PRIMARY KEY,
answer_id int REFERENCES answers(id),
url VARCHAR(400));

CREATE INDEX q_id ON qa.questions (question_id);

CREATE INDEX a_id ON qa.answers (answer_id);
CREATE INDEX aq_id ON qa.answers (question_id);

CREATE INDEX ap_id ON qa.answers_photos (id);
CREATE INDEX apa_id ON qa.answers_photos (answer_id);

COPY qa.questions(question_id, product_id, question_body, question_date, asker_name, asker_email,reported, question_helpfulness)
FROM '/Users/mcolligan/FEC/projectGreenfieldII/csvData/questions.csv' DELIMITER ',' CSV HEADER;

COPY qa.answers(answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
FROM '/Users/mcolligan/FEC/projectGreenfieldII/csvData/answers.csv' DELIMITER ',' CSV HEADER;

COPY qa.answers_photos(id, answer_id, url)
FROM '/Users/mcolligan/FEC/projectGreenfieldII/csvData/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('questions_id_seq', (SELECT MAX(question_id) FROM qa.questions)+1);

SELECT setval('answers_id_seq', (SELECT MAX(answer_id) FROM qa.answers)+1);

SELECT setval('answers_photos_id_seq', (SELECT MAX(id) FROM qa.answers_photos)+1);


