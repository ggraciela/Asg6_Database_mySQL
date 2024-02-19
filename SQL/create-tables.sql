CREATE TABLE A01304196_user (
  ID int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (ID),
  user_name VARCHAR(50), 
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(50)
);  


CREATE TABLE A01304196_user_timeline (
  ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  PRIMARY KEY (ID),
  date_of_post VARCHAR(50),
  article_title VARCHAR(100),
  time_of_post VARCHAR(50),
  number_of_views VARCHAR(10),
  FOREIGN KEY (user_id) REFERENCES A01304196_user(ID) ON UPDATE CASCADE ON DELETE CASCADE
);

