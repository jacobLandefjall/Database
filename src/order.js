const mysql  = require("promise-mysql");
const config = require("../config/db/eshop.json");
let pool; // Deklarera en variabel för att lagra anslutningen

(async function initializePool() { // Skapa en anslutning till databasen
    pool = await mysql.createPool(config);
}) ();

async function skapaNyOrder(kundId, produkt_id, antal, datum, faktura) {
    try {
    const [result] = await pool.query('CALL SkapaOrder(?, ?, ?, ?, ?)', [kundId, produkt_id, antal, datum, faktura]);
    console.log(result);
    return result.insertId;
    } catch (error) {
        console.error('Fel att skapa order', error);}
        throw error;
    }

async function laggTillOrderrad(BestallningsId, ProduktId, Antal) {
    await pool.query('CALL laggTillOrderrad(?, ?, ?)', [BestallningsId, ProduktId, Antal]);
}

async function andraOrderStatus(BestallningsId, Status) {
    await pool.query('CALL AndraOrderStatus(?, ?)', [BestallningsId, Status]);
}

async function visaKundOrder() {
    const result = await pool.query('CALL VisaKundOrder()');
    console.log(result);
    return result;
}

module.exports = { skapaNyOrder, laggTillOrderrad, andraOrderStatus , visaKundOrder };
