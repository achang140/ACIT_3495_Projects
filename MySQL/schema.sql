CREATE DATABASE IF NOT EXISTS videos_db;
USE videos_db;

CREATE USER IF NOT EXISTS 'videouser'@'%' IDENTIFIED BY 'Password';
GRANT ALL PRIVILEGES ON videos_db.* TO 'videouser'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS videos (
  video_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL
);