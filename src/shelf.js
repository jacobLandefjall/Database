/**
 * Command shelf to show "lagerhyllor"
 */
/**
 * Module to cli.js
 */
const mysql = require("promise-mysql");
const config = require("../config/db/eshop.json");

async function showShelf() {
    try {
        const db = await mysql.createConnection(config);
        const sql = `SELECT DISTINCT lagerhyllor FROM lager`; // Distinct to show unique values
        const rows = await db.query(sql);

        console.log(`All shelfs:`);
        rows.forEach((row, index) => {
            console.log(`${index + 1}. shelf: ${row.lagerhyllor}`);
        });

        await db.end();
    } catch (error) {
        console.error(`Error showing shelf: ${error}`);
    }
}

module.exports = { showShelf };
