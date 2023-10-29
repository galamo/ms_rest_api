CREATE SCHEMA `vacations` ;


CREATE TABLE `vacations`.`vacations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vacationType` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `vacations`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));


INSERT INTO `vacations`.`vacations` (`vacationType`, `price`, `country`) VALUES ('trip', '300', 'IL'),('pleasure', '600', 'DO');
INSERT INTO `vacations`.`users` (`user_name`, `password`) VALUES ('stassi', 's123456'),('racheli', 'r123456');
