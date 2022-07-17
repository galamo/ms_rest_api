CREATE SCHEMA `vacations` ;


CREATE TABLE `vacations`.`vacations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vacationType` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));


INSERT INTO `vacations`.`vacations` (`vacationType`, `price`, `country`) VALUES ('trip', '300', 'IL'),('pleasure', '600', 'DMA');
