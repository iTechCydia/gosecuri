CREATE DATABASE IF NOT EXISTS `gosecuri` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gosecuri`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `lastname` VARCHAR (50),
    `firstname` VARCHAR (50),
    `email` VARCHAR (139),
    `image` TEXT
) ENGINE=InnoDB;

