-- Reset database eshop
DROP DATABASE IF EXISTS eshop;
CREATE DATABASE eshop;
USE eshop;

-- Drop tables if they exist
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS lager;
DROP TABLE IF EXISTS betyg;
DROP TABLE IF EXISTS kunder;
DROP TABLE IF EXISTS hemsida;
DROP TABLE IF EXISTS logg;
DROP TABLE IF EXISTS produkter;


Create table produkter
(
  produkt_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  pris FLOAT,
  namn VARCHAR(50),
  antal INT
);
INSERT INTO produkter(produkt_id, pris, namn, antal) VALUES
    (11, 50, "Jacobskaffe", 20),
    (22, 129, "Linnste", 15),
    (33, 179, "sqlte", 20),
    (44, 210, "htmlmuggar", 10),
    (55, 300, "javaglass", 5);

CREATE TABLE lager
(
  produkt_id INT NOT NULL,
  lagerhyllor INT,
  utbud VARCHAR(50),
  antal INT,
  FOREIGN KEY (produkt_id) REFERENCES produkter(produkt_id)
);
ALTER TABLE lager
ADD UNIQUE KEY `unique_product_shelf` (`produkt_id`, `lagerhyllor`);

INSERT INTO lager (produkt_id, lagerhyllor, utbud, antal) VALUES
    (11, 1, "Kaffe", 100),
    (22, 2, "Te", 200),
    (33, 3, "Muggar", 300),
    (44, 4, "Snabbkaffe", 400),
    (55, 5, "Tillbehör", 500);

CREATE TABLE kategori
( 
  kategori_id INT PRIMARY KEY NOT NULL,
  kategori VARCHAR(50)
);

INSERT INTO kategori(kategori_id, kategori) VALUES
    (1, "Kaffe"),
    (2, "Grönt-te"),
    (3, "Svart-te"),
    (4, "Muggar"),
    (5, "Tillbehör");

CREATE TABLE produktkategorier
(
    kategori_id INT,
    produkt_id INT,
    FOREIGN KEY (produkt_id) REFERENCES produkter(produkt_id),
    FOREIGN KEY (kategori_id) REFERENCES kategori(kategori_id)
);
CREATE TABLE kunder
(
  kund_id INT,
  namn VARCHAR(10) NOT NULL,
  adress VARCHAR(50),
  telefon INT,
  PRIMARY KEY (kund_id)
);

INSERT INTO kunder(kund_id, namn, adress, telefon) VALUES
  (1,"Linn","godisvägen",0455123),
  (2,"Jacob","sockervägen",0455124),
  (3,"Marie","glassvägen",0455125),
  (4,"Andreas","kakvägen",0455126),
  (5,"Kenneth","brödvägen",0455127);

INSERT INTO produktkategorier (kategori_id, produkt_id) VALUES
    (1, 11),
    (2, 22),
    (3, 33),
    (4, 44),
    (5, 55);

CREATE TABLE orders
(
  Bestallnings_id INT AUTO_INCREMENT,
  kund_id INT,
  produkt_id INT,
  datum DATE,
  faktura INT,
  PRIMARY KEY (Bestallnings_id),
  FOREIGN KEY (kund_id) REFERENCES kunder(kund_id),
  FOREIGN KEY (produkt_id) REFERENCES produkter(produkt_id) 
);

INSERT INTO orders(kund_id, Bestallnings_id, produkt_id, datum, faktura) VALUES
  (1, 12, 11, '2024-02-27', 123),
  (2, 15, 22, '2024-02-28', 124),
  (3, 22, 33, '2024-03-01', 125),
  (4, 45, 44, '2024-03-02', 126),
  (5, 9, 55, '2024-03-03', 127);

CREATE TABLE orderrader (
    orderrad_id INT AUTO_INCREMENT PRIMARY KEY,
    Bestallnings_id INT,
    produkt_id INT,
    antal INT,
    FOREIGN KEY (Bestallnings_id) REFERENCES orders(Bestallnings_id),
    FOREIGN KEY (produkt_id) REFERENCES produkter(produkt_id)
);


CREATE TABLE  betyg
(
  rekommendationer INT,
  kommentar VARCHAR(100),
  anvandaruppgifter CHAR(50),
  PRIMARY KEY (anvandaruppgifter)
);
INSERT INTO betyg (rekommendationer, kommentar, anvandaruppgifter) VALUES
    (1, "Gott Kaffe!", "Anvandaruppgifter1"),
    (2, "Rekommenderar", "Anvandaruppgifter2"),
    (3, "Fina muggar.", "Anvandaruppgifter3"),
    (4, "Snabb levernas", "Anvandaruppgifter4"),
    (5, "Billigt och bra!", "Anvandaruppgifter5");



CREATE TABLE hemsida(
  inbjudande VARCHAR(100),
  lattanvand VARCHAR(100)
);


CREATE TABLE logg
(
  tidsstampel TIMESTAMP,
  kontaktuppgifter CHAR(50),
  anvandaruppgifter CHAR(50),
  PRIMARY KEY (anvandaruppgifter)
);
INSERT INTO logg (tidsstampel, kontaktuppgifter, anvandaruppgifter) VALUES
    ('2024-02-27 01:00', "Kontaktuppgifter1", "Anvandaruppgifter1"),
    ('2024-02-28 06:00', "Kontaktuppgifter2", "Anvandaruppgifter2"),
    ('2024-03-01 10:00', "Kontaktuppgifter3", "Anvandaruppgifter3"),
    ('2024-03-02 16:00', "Kontaktuppgifter4", "Anvandaruppgifter4"),
    ('2024-03-03 18:00', "Kontaktuppgifter5", "Anvandaruppgifter5");




CREATE TABLE log_event
(
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  log_description VARCHAR(155)
);

-- CRUD

DELIMITER //
CREATE PROCEDURE skapaProdukt(IN namn VARCHAR(50), IN pris FLOAT, IN antal INT)
BEGIN
  INSERT INTO produkter(namn, pris, antal) VALUES (namn, pris, antal);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE visaProdukt(IN produktID INT)
BEGIN
  SELECT * FROM produkter WHERE produkt_id = produktID;
END //
DELIMITER ;


DELIMITER // -- Tar emot tre argument, produktID, nyttNamn och nyttPris
CREATE PROCEDURE uppdateraProdukt(IN produktID INT, IN nyttNamn VARCHAR(50), IN nyttPris FLOAT)
BEGIN -- Uppdaterar produkter där namn och pris är lika med nyttNamn och nyttPris där produkt_id är lika med produktID
  UPDATE produkter SET namn = nyttNamn, pris = nyttPris WHERE produkt_id = produktID;
END //
DELIMITER ;


DELIMITER // -- Tar emot ett argument, produktID
CREATE PROCEDURE TaBortProdukt(IN produktID INT)
BEGIN -- Tar bort produkter där produkt_id är lika med produktID
  DELETE FROM produkter WHERE produkt_id = produktID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SkapaOrder(
    IN kundID INT, 
    IN produkt_id INT, 
    IN antal INT, 
    IN datum DATE, 
    IN faktura INT
)
BEGIN
    DECLARE bestallningsID INT;

    -- Skapa en order
    INSERT INTO orders(kund_id, datum, faktura) VALUES (kund_id, datum, faktura);
    SET bestallningsID = LAST_INSERT_ID(); -- Hämta ID för den nya ordern

    -- Lägg till en orderrad för den skapade ordern
    INSERT INTO orderrader(Bestallnings_id, produkt_id, antal) VALUES (bestallningsID, produkt_id, antal);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE laggTillOrder(IN bestallningsID INT, IN produktID INT, IN antal INT)
BEGIN
  INSERT INTO orderrader(Bestallnings_id, produkt_id, antal) VALUES (bestallningsID, produktID, antal);
END //

DELIMITER //
CREATE PROCEDURE andraOrderStatus(IN BestallningsId INT, IN Status VARCHAR(20))
BEGIN
    UPDATE orders SET order_status = Status WHERE Bestallnings_id = BestallningsId;
END //
DELIMITER ;
-- Ändra denna procedur så den kallar på alla ordrar, sedan i js hämtar jag det som behövs i koden
DELIMITER //
CREATE PROCEDURE VisaKundOrder(IN kundID INT)
BEGIN
    SELECT orders.Bestallnings_id, COUNT(orderrader.produkt_id) AS AntalProdukter, SUM(orderrader.antal * produkter.pris) AS TotaltPris
    FROM orders
    INNER JOIN orderrader ON orders.Bestallnings_id = orderrader.Bestallnings_id
    INNER JOIN produkter ON orderrader.produkt_id = produkter.produkt_id
    WHERE orders.kund_id = kundID
    GROUP BY orders.Bestallnings_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE VisaAllaOrder()
BEGIN
    SELECT orders.Bestallnings_id, COUNT(orderrader.produkt_id) AS AntalProdukter, SUM(orderrader.antal * produkter.pris) AS TotaltPris
    FROM orders
    INNER JOIN orderrader ON orders.Bestallnings_id = orderrader.Bestallnings_id
    INNER JOIN produkter ON orderrader.produkt_id = produkter.produkt_id
    GROUP BY orders.Bestallnings_id;
END //
DELIMITER ;

