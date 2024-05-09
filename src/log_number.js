
/**
 * Create command log<number>
 * Module to cli.js
 */
const mysql  = require("promise-mysql");
const config = require("../config/db/eshop.json");

// number = 10 gives 10 as default value
async function logNumber(number = 10) {
    try {
        const db = await mysql.createConnection(config);
        const sql = `SELECT * FROM logg ORDER BY tidsstampel DESC LIMIT ?`;
        const rows = await db.query(sql, [number]);

        console.log(`Latest ${number} log entries`);
        rows.forEach((row, index) => {
            console.log(`${index + 1}. ${row.tidsstampel}, kontaktuppgifter: ${row.kontaktuppgifter},
            anvandaruppgifter: ${row.anvandaruppgifter}`);
        });

        await db.end();
    } catch (error) {
        console.error(`Error showing log: ${error}`);
    }
}

logNumber(10);
module.exports = { logNumber };
