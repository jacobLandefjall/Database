-- sql-code with kunder, produkter, produktkategorier, lagerhyllor

LOAD DATA LOCAL INFILE 'kunder.csv'
INTO TABLE kunder
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA LOCAL INFILE 'produkter.csv'
INTO TABLE produkter
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(produkter_id, pris, utbud, kategori_id, lagerhyllor);

LOAD DATA LOCAL INFILE 'produktkategorier.csv'
INTO TABLE produktkategorier
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


-- Insert data into table kunder
INSERT INTO kunder(kund_id, namn, adress, telefon) VALUES
    (1,"Linn","godisvägen",0455123),
    (2,"Jacob","sockervägen",0455124),
    (3,"Marie","glassvägen",0455125),
    (4,"Andreas","kakvägen",0455126),
    (5,"Kenneth","brödvägen",0455127);

-- Insert data into table produkter
INSERT INTO produkter(produkter_id, pris, utbud, kategori_id, lagerhyllor) VALUES
    (1, 50, 1, 1, 1),
    (2, 129, 2, 2, 2),
    (3, 179, 3, 3, 3),
    (4, 210, 4, 4, 4),
    (5, 300, 5, 5, 5);

-- Insert data into table produktkategorier
INSERT INTO produktkategorier (kategori_id, kategori) VALUES
    (1, "Kaffe"),
    (2, "Grönt-te"),
    (3, "Svart-te"),
    (4, "Muggar"),
    (5, "Tillbehör");

-- Insert data into table lagerhyllor
INSERT INTO lager (produkter_id, arbetare, struktur, lagersaldo, lagerhyllor) VALUES
    (1, 1, "Struktur1", 100, 1),
    (2, 2, "Struktur2", 200, 2),
    (3, 3, "Struktur3", 300, 3),
    (4, 4, "Struktur4", 400, 4),
    (5, 5, "Struktur5", 500, 5);

-- insert data into table logg
INSERT INTO logg (tidstampel, kontaktuppgifter, anvandaruppgifter) VALUES
    ('2024-02-27 01:00', "Kontaktuppgifter1", "Anvandaruppgifter1"),
    ('2024-02-28 06:00', "Kontaktuppgifter2", "Anvandaruppgifter2"),
    ('2024-03-01 10:00', "Kontaktuppgifter3", "Anvandaruppgifter3"),
    ('2024-03-02 16:00', "Kontaktuppgifter4", "Anvandaruppgifter4"),
    ('2024-03-03 18:00', "Kontaktuppgifter5", "Anvandaruppgifter5");

-- insert data into table beytg
INSERT INTO betyg (rekommendationer, kommentar, anvandaruppgifter) VALUES
    (1, "Gott Kaffe!", "Anvandaruppgifter1"),
    (2, "Rekommenderar", "Anvandaruppgifter2"),
    (3, "Fina muggar.", "Anvandaruppgifter3"),
    (4, "Snabb levernas", "Anvandaruppgifter4"),
    (5, "Billigt och bra!", "Anvandaruppgifter5");