DROP TABLE IF EXISTS `availabilities`;

CREATE TABLE `availabilities` (
`id` INT NOT NULL AUTO_INCREMENT,
`userName` VARCHAR(100) NOT NULL, 
`movieName` VARCHAR(100) NOT NULL, 
`location` VARCHAR(100) NOT NULL, 
`date` DATE NOT NULL,
`heure` TIME NOT NULL,
PRIMARY KEY (`id`));

INSERT INTO availabilities (userName, movieName, location, date, heure ) 
VALUES ('Romain', 'The Room', 'Bellecour', '2022-08-22', '16:47:41');

