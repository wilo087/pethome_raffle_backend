CREATE DATABASE pethome_raffle;

use pethome_raffle;


CREATE TABLE users (
 id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
 nombre VARCHAR(100) NOT NULL,
 cedula INT(11) NOT NULL,
 codigo INT (11) NOT NULL,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
