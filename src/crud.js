const mysql = require("promise-mysql");
const config = require("../config/db/eshop.json");

let pool; // Deklarera en variabel för att lagra anslutningen

(async function initializePool() { // Skapa en anslutning till databasen
    pool = await mysql.createPool(config);
}) ();

// Kallar på lagrade procedurer. för att kunna skapa en produkt.
async function skapaProdukt(namn, pris, antal) {
    const result = await pool.query(`CALL skapaProdukt(?, ?, ?)`, [namn, pris, antal]);

    console.log("Produkt skapad", result);
    return result;
}

async function visaProdukt(produktID) {
    const result = await pool.query(`CALL visaProdukt(?)`, [produktID]);

    console.log("Visar produkt", result);
    return result;
}
 // Kallar på lagrade procedurer. för att kunna ta bort en produkt.
async function TaBortProdukt(produktID) {
    const result = await pool.query(`CALL TaBortProdukt(?)`, [produktID]); // Anropa proceduren

    console.log("Tar bort produkt", result);
    return result;
}
// Uppdatera produkt och innehåller tre parametrar.
async function uppdateraProdukt(produktID, nyttNamn, nyttPris) { 
    try { // Använd try-catch för att hantera eventuella fel
        const result = await pool.query(`CALL uppdateraProdukt(?, ?, ?)`, [produktID, nyttNamn, nyttPris]);
        console.log("Produkt uppdaterad", result);
        return result; // Returnera resultatet
    } catch (error) { // Fånga upp eventuella fel
        console.error("Error updating product", error);
        throw error; // Kasta om felet för att hantera det i Express-routern
    }
}



module.exports = { skapaProdukt, visaProdukt, TaBortProdukt, uppdateraProdukt };
