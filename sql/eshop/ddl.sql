
--- Tables with columns

-- Create tables for the our eshop database
-- Table products
Create table produkter
(
  produkter_id INT PRIMARY KEY NOT NULL, -- Primary key
  pris FLOAT, -- Price of the product
  namn VARCHAR(50), -- Name of the product
  utbud CHAR(50), -- All the products
  kategori_id INT, -- Category id
  lagerhyllor INT -- Stock shelves
);

CREATE TABLE produktkategorier
(
    kategori_id INT PRIMARY KEY NOT NULL, -- Primary key
    kategori VARCHAR(50) -- Category
);

-- Table orders, Do not use "order"
CREATE TABLE orders
(
  Bestallnings_id INT, -- Primary key
  datum DATE, -- Date of the order
  faktura INT NOT NULL, -- Invoice of the order
  kund_id INT, -- Customer id

  PRIMARY KEY (Bestallnings_id) -- Primary key
);

-- Table lager
CREATE TABLE lager
(
  produkter_id INT, -- Product id
  arbetare INT DEFAULT NULL, -- Worker
  struktur CHAR(50), -- Structure
  lagersaldo FLOAT, -- Stock balance
  lagerhyllor INT, -- Stock shelves

  PRIMARY KEY (produkter_id), -- Primary key
  FOREIGN KEY (produkter_id) REFERENCES produkter(produkter_id) -- Foreign key to the product
);

-- Table betyg
CREATE TABLE  betyg
(
  rekommendationer INT, -- Recommendations
  kommentar VARCHAR(100), -- Comment
  anvandaruppgifter CHAR(50), -- User information

  PRIMARY KEY (anvandaruppgifter) -- Primary key
);

-- Table kunder
CREATE TABLE kunder
(
  kund_id INT, -- Customer id
  namn VARCHAR(10) NOT NULL, -- Name
  kontaktuppgifter CHAR(50),

  PRIMARY KEY (kund_id) -- Primary key
);

-- Table hemsida
CREATE TABLE hemsida(
  inbjudande VARCHAR(100), -- Inviting
  lattanvand VARCHAR(100) -- Easy to use
);

-- Table logg
CREATE TABLE logg
(
  tidstampel TIMESTAMP, -- Timestamp
  kontaktuppgifter CHAR(50),
  anvandaruppgifter CHAR(50), -- User information
  Primary key (anvandaruppgifter), -- Primary key
  FOREIGN KEY (anvandaruppgifter) REFERENCES betyg(anvandaruppgifter) -- Foreign key to the user information
);

-- Create logg table
-- Logg if INSERT and UPDATE is done
-- USE TRIGGERS
CREATE TABLE log_event
(
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  log_description VARCHAR(155)
);

-- Trigger for logg INSERT event
-- DELIMITER = Temporary change a decision
DELIMITER //
CREATE TRIGGER logg_insert_produkter
AFTER INSERT ON produkter
FOR EACH ROW
BEGIN
  INSERT INTO log_event (log_description) VALUES (
    CONCAT('New product with time ', NEW.produkter_id, '.')
  );
END;
//

-- Trigger for logg UPDATE event
-- ;; and // = Making database not confused
DELIMITER ;;
CREATE TRIGGER logg_update_produkter
AFTER UPDATE ON produkter
FOR EACH ROW
BEGIN
  INSERT INTO log_event (log_description) VALUES (
    CONCAT('details on time ', NEW.produkter_id, ' has been updated.')
  );
END;;
DELIMITER ;

-- lagrade procedurer
-- DELIMITER //

-- CREATE PROCEDURE GetAllProducts()
-- BEGIN
--     SELECT * FROM produkter;
-- END //

-- DELIMITER ;