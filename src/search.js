// Funktioner till cli.js
const mysql = require("promise-mysql");
const config = require("../config/db/exam.json");


//kommandot search
async function search(filter) {
    try {
        const db = await mysql.createConnection(config);

        // Söka efter kraftverk med lagrad procedur
        const kraftverkResult = await db.query('CALL search_kraftverk(?)', [filter]);
        console.log(`Search result for: ${filter} (kraftverk)`);
        console.table(kraftverkResult[0]);

        // Söka efter konsumenter med lagrad procedur
        const konsumentResult = await db.query('CALL search_konsument(?)', [filter]);
        console.log(`Search result for: ${filter} (konsumenter)`);
        console.table(konsumentResult[0]);

        await db.end();
    } catch (error) {
        console.error("Error searching inventory", error);
    }
}

module.exports = { search };