// Module to index
// Show a table of all products categories.
const mysql  = require("promise-mysql");
const config = require("../config/db/eshop.json");

async function showCategories() {
    try {
        const pool = await mysql.createPool(config); // Create a connection to the database.
        const connection = await pool.getConnection(); // Get the connection.

        const sql = `
            SELECT * FROM kategori;
        `;
        const categories = await connection.query(sql);

        connection.release(); // Release the connection.

        return categories;
    } catch (error) {
        console.error(`Error showing categories:`, error);
        throw error;
    }
}

module.exports = { showCategories };
