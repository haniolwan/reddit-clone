BEGIN;
    DROP TABLE IF EXISTS users,posts,comments;
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL
    );

    INSERT INTO users(username) VALUES ('hani3l'),('adam3l');

    CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(225),
    body TEXT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id));

    INSERT INTO posts(title,body,user_id) VALUES ('How long would it take me to make a Reddit clone?','There is only one way to beat this addiction and most of us.',1)
    ,('1852 DAYS! Reaching new levels!','There is only one way to beat this addiction and most of us, including me',1),('We have been doing it wrong all this time [No clickbait]','There is only one way to beat this addiction and most of us.',2);

    CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id));


COMMIT;
