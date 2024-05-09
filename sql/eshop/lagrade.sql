DELIMITER //

-- Lagrad procedur för att radera och återskapa databasen eshop och dess tabeller
CREATE PROCEDURE DropAndRecreateDatabase()
BEGIN
    DROP DATABASE IF EXISTS eshop;
    CREATE DATABASE eshop;
    USE eshop;

    -- Radera tabeller om de redan finns
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS lager;
    DROP TABLE IF EXISTS betyg;
    DROP TABLE IF EXISTS kunder;
    DROP TABLE IF EXISTS hemsida;
    DROP TABLE IF EXISTS logg;
    DROP TABLE IF EXISTS produkter;
END //

DELIMITER ;

DELIMITER //

-- Lagrade procedurer för att hämta alla produkter
CREATE PROCEDURE GetAllProducts()
BEGIN
    SELECT * FROM produkter;
END //

-- Lagrade procedurer för att hämta alla produktkategorier
CREATE PROCEDURE GetAllCategories()
BEGIN
    SELECT * FROM produktkategorier;
END //

-- Lagrade procedurer för att hämta alla beställningar
CREATE PROCEDURE GetAllOrders()
BEGIN
    SELECT * FROM orders;
END //

-- Lagrade procedurer för att hämta alla kunder
CREATE PROCEDURE GetAllCustomers()
BEGIN
    SELECT * FROM kunder;
END //

-- Lagrade procedurer för att hämta alla betyg
CREATE PROCEDURE GetAllRatings()
BEGIN
    SELECT * FROM betyg;
END //

-- Lagrade procedurer för att hämta alla hemsidauppgifter
CREATE PROCEDURE GetAllWebsiteDetails()
BEGIN
    SELECT * FROM hemsida;
END //

-- Lagrade procedurer för att hämta alla loggposter
CREATE PROCEDURE GetAllLogs()
BEGIN
    SELECT * FROM logg;
END //

DELIMITER ;

DELIMITER //

-- Lagrad procedur för att ladda data från kunder.csv till tabellen kunder
CREATE PROCEDURE LoadCustomersData()
BEGIN
    LOAD DATA LOCAL INFILE 'kunder.csv'
    INTO TABLE kunder
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES;
END //

-- Lagrad procedur för att ladda data från produkter.csv till tabellen produkter
CREATE PROCEDURE LoadProductsData()
BEGIN
    LOAD DATA LOCAL INFILE 'produkter.csv'
    INTO TABLE produkter
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (produkter_id, pris, utbud, kategori_id, lagerhyllor);
END //

-- Lagrad procedur för att ladda data från produktkategorier.csv till tabellen produktkategorier
CREATE PROCEDURE LoadProductCategoriesData()
BEGIN
    LOAD DATA LOCAL INFILE 'produktkategorier.csv'
    INTO TABLE produktkategorier
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES;
END //

-- Lagrad procedur för att utföra alla insättningar av data
-- CREATE PROCEDURE InsertData()
-- BEGIN
--     -- Insert data into table kunder
--     INSERT INTO kunder(kund_id, namn, kontaktuppgifter) VALUES
--         (1, "Linn", "Kontaktuppgifter1"),
--         (2, "Jacob", "Kontaktuppgifter2"),
--         (3, "Kenneth", "Kontaktuppgifter3"),
--         (4, "Marie", "Kontaktuppgifter4"),
--         (5, "Andreas", "Kontaktuppgifter5");
    
--     -- Insert data into table produkter
--     INSERT INTO produkter(produkter_id, pris, utbud, kategori_id, lagerhyllor) VALUES
--         (1, 50, 1, 1, 1),
--         (2, 129, 2, 2, 2),
--         (3, 179, 3, 3, 3),
--         (4, 210, 4, 4, 4),
--         (5, 300, 5, 5, 5);
    
--     -- Insert data into table produktkategorier
--     INSERT INTO produktkategorier (kategori_id, kategori) VALUES
--         (1, "Kaffe"),
--         (2, "Grönt-te"),
--         (3, "Svart-te"),
--         (4, "Muggar"),
--         (5, "Tillbehör");
    
--     -- Insert data into table lagerhyllor
--     INSERT INTO lager (produkter_id, arbetare, struktur, lagersaldo, lagerhyllor) VALUES
--         (1, 1, "Struktur1", 100, 1),
--         (2, 2, "Struktur2", 200, 2),
--         (3, 3, "Struktur3", 300, 3),
--         (4, 4, "Struktur4", 400, 4),
--         (5, 5, "Struktur5", 500, 5);
    
--     -- Insert data into table logg
--     INSERT INTO logg (tidstampel, kontaktuppgifter, anvandaruppgifter) VALUES
--         ('2024-02-27 01:00', "Kontaktuppgifter1", "Anvandaruppgifter1"),
--         ('2024-02-28 06:00', "Kontaktuppgifter2", "Anvandaruppgifter2"),
--         ('2024-03-01 10:00', "Kontaktuppgifter3", "Anvandaruppgifter3"),
--         ('2024-03-02 16:00', "Kontaktuppgifter4", "Anvandaruppgifter4"),
--         ('2024-03-03 18:00', "Kontaktuppgifter5", "Anvandaruppgifter5");
    
--     -- Insert data into table betyg
--     INSERT INTO betyg (rekommendationer, kommentar, anvandaruppgifter) VALUES
--         (1, "Gott Kaffe!", "Anvandaruppgifter1"),
--         (2, "Rekommenderar", "Anvandaruppgifter2"),
--         (3, "Fina muggar.", "Anvandaruppgifter3"),
--         (4, "Snabb levernas", "Anvandaruppgifter4"),
--         (5, "Billigt och bra!", "Anvandaruppgifter5");
-- END //

DELIMITER ;