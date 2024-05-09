// Function Product
// Show all products.
// Module to cli.js
const mysql  = require("promise-mysql");
const config = require("../config/db/eshop.json");
const { promiseImpl } = require("ejs");


async function showProducts() {
    try {
        const pool = await mysql.createPool(config); // Create a connection to the database.
        const connection = await pool.getConnection(); // Get the connection.
        const rows = await connection.query(`SELECT * FROM produkter;`);

        console.log(`All products:`);
        if (Array.isArray(rows) && rows.length > 0) {
            rows.forEach((row) => {
                console.log(`ID: ${row.produkt_id}, Produkt: ${row.namn}, Pris: ${row.pris}`);
            });
        } else {
            console.log("No products found");
        }
        connection.release(); // Release the connection.
    } catch (error) {
        console.error(`Error showing products: ${error}`);
    }
}
showProducts();

async function webbProducts() {
    const connection = await mysql.createConnection(config);

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM produkter`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function selectProducts(data) {
    const db = await mysql.createConnection(config);
    let sql = `CALL showProducts(?, ?, ? , ?, ?)`;

    let res = await db.query(sql, [data.produkter, data.arbetare, data.struktur, data.lagersaldo, data.lagerhyllor]);
}

async function skapaProdukt(namn, pris) {
    mysql.Connection.query(`CALL skapaProdukt(?, ?, ?)`, [namn, pris, antal], (error, results) => {
        if (error) throw error;
        console.log("Produkt skapad", results);
    });
}

function visaProdukt(produktID) {
    mysql.Connection.query(`CALL visaProdukt(?)`, [produktID], (error, results) => {
        if (error) throw error;
        console.log("Visar produkt", results);
    });
}

function TaBortProdukt(produktID) {
    Connection.query(`CALL raderaProdukt(?)`, [produktID], (error, results) => {
        if (error) throw error;
        console.log("Produkt borttagen", results);
    });
}

function uppdateraProdukt(produktID, nyttNamn, nyttPris) {
    Connection.query(`CALL uppdateraProdukt(?, ?, ?)`, [produktID, nyttNamn, nyttPris], (error, results) => {
        if (error) throw error;
        console.log("Produkt uppdaterad", results);
    });
}

// skapa en order med totalt pris, antal produkter, vilken kund
async function skapaOrder(kundID, produkt_id, antal, datum, faktura) {
    const db = await mysql.createConnection(config);
    let sql = `CALL skapaOrder(?, ?, ?, ?, ?)`;

    let res = await db.query(sql, [kundID, produkt_id, antal, datum, faktura ]);
    console.log("Order created: ", res);
    return res
}


module.exports = { showProducts, webbProducts, selectProducts, skapaProdukt, visaProdukt, TaBortProdukt, uppdateraProdukt, skapaOrder};
