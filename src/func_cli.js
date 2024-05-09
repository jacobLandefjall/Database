// Connect to the database
// Module to cli.js
const mysql = require("promise-mysql");
const config = require("../config/db/eshop.json");


// Function to show the inventory of products in "lager"
async function showInventory() {
    const db = await mysql.createConnection(config);

    // Get info about inventory.
    const sql = `
        SELECT l.lagerhyllor, l.antal, p.namn AS produktnamn, p.produkt_id
        FROM lager l
        JOIN produkter p ON p.produkt_id = l.produkt_id;
    `;
    const inventory = await db.query(sql);

    // Print the inventory.
    console.log("Inventory:");
    console.table(inventory);

    await db.end();
}

// Function to add number of products to shelf.
async function addToInventory(productId, shelf, number) {
    try {
        const db = await mysql.createConnection(config);

        const sql = `
            INSERT INTO lager(produkt_id, lagerhyllor, antal) VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE antal = antal + ?;
            `;

        await db.query(sql, [productId, shelf, number, number]);

        await db.end();
        console.log(`Added ${number} products to shelf ${shelf} for product ${productId}`);
    } catch (error) {
        console.error("Error adding to inventory", error);
    }
}

// Function to search for products in the shelf.
// p = produkter, l = lager
async function searchInventory(filter) {
    try {
        const db = await mysql.createConnection(config);
        const sql = `
            SELECT p.produkt_id, p.namn AS produkt_namn, p.pris, l.lagerhyllor
            FROM produkter p
            LEFT JOIN lager l ON l.produkt_id = p.produkt_id
            WHERE p.namn LIKE ? OR l.antal like ?
            `;
        const inventory = await db.query(sql, [`%${filter}%`, `%${filter}%`, `%${filter}%`]);

        console.log(`Search result for: ${filter}`);
        console.table(inventory);

        await db.end();
    }  catch (error) {
        console.error("Error searching inventory", error);
    }
}

// Function to remove number of products from shelf.
async function removeFromInventory(productId, shelf, number) {
    try {
        const db = await mysql.createConnection(config);

        console.log('Removing from inventory:');
        console.log('Product ID:', productId);
        console.log('Shelf:', shelf);
        console.log('Quantity:', number);

        // GREATEST to get the highest value.
        const sql = `
            UPDATE lager
            SET antal = GREATEST(antal - ?, 0)
            WHERE produkt_id = ? AND lagerhyllor = ?;
        `;

        await db.query(sql, [number, productId, shelf]);

        await db.end();
        console.log(`Removed ${number} products from shelf ${shelf} for product ${productId}`);
    } catch (error) {
        console.error("Error removing from inventory", error);
    }
}
removeFromInventory(1, 1, 1);


// Function to show the meny.
function showMenu() {
    console.log(`
    Alternatives:
    about, group - Show group information
    shelf - Show shelf information
    product - Show product information
    inventory - Show inventory information
    search inv - search for products
    invadd - Add products to inventory
    invdel - Remove products from inventory
    log - Show log latest log entries
    menu, help - show menu
    exit, quit - exit program
    `);
}

// Export the functions
module.exports = { addToInventory, searchInventory, removeFromInventory, showMenu, showInventory };
