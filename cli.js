// Build a terminal program och save main-function in cli.js.
//Start with Node cli.js
const { showMenu, showInventory, searchInventory, addToInventory, removeFromInventory } = require("./src/func_cli.js");
const { showAbout } = require("./src/about.js");
const { logNumber } = require("./src/log_number.js");
const { showShelf } = require("./src/shelf.js");
const { showProducts } = require("./src/product.js");
const { showOrders, searchOrders }= require("./src/ordercli.js");
const { showPicklist } = require("./src/plocklist.js");

// Function to start the program.
async function start() {
    console.log("Program started!");

    // Creates a loop for the program to read the input from the user.
    process.stdin.on('data', async function (data) {
        const input = data.toString().trim(); // Remove trailing newline
        const command = input.split(' ');

        console.log(command);

        // Check the input and call the correct function.
        if (command[0] === 'about' || command[0] === 'group') {
            showAbout(); // Print About or Group
        } else if (command[0] === 'menu' || command[0] === 'help') {
            showMenu(); // Print menu or help
        } else if (command[0] === 'shelf') {
            showShelf(); // Print shelf
        } else if (command[0] === 'log') {
            logNumber(); // Print log
        } else if (command[0] === 'inventory') {
            showInventory(); // Print inventory
        } else if (command[0] === 'search' && command[1] === 'inv') {
            console.log('Search for products:'); // Search for products
            process.stdin.once('data', (input) => {
                const filter = input.toString().trim();

                searchInventory(filter);
            });
        } else if (command[0] === 'invadd') {
            // Kontrollera att kommandot har tillräckligt med argument
            if (command.length < 4) {
                console.log("Error: invadd requires 3 arguments");
                return;
            }
            // Add products to inventory
            console.log("Command array:", command);
            console.log(command);
            const productId = command[1];
            const shelf = command[2];
            const number = command[3];

            console.log('Add products to inventory:');
            console.log('product ID', productId);
            console.log('shelf', shelf);
            console.log('quantity', number);
            await addToInventory(productId, shelf, number);
            console.log(`Added ${number} products to shelf ${shelf} for product ${productId}`);
        } else if (command[0] === 'invdel') {
            if (command.length !== 4) {
                console.log('Error: invdel requires 3 arguments');
                return;
            }
            // Remove products from inventory
            console.log('Remove products from inventory:');
            const productId = command[1];
            const shelf = command[2];
            const quantity = command[3];

            console.log('product ID', productId);
            console.log('shelf', shelf);
            console.log('quantity', quantity);
            removeFromInventory(productId, shelf, quantity);
            console.log(`Removed ${quantity} products from shelf
             ${shelf} for product ${productId}`);
        } else if (command[0] === 'product') {
            showProducts(); // Print products
        } else if (command[0] ==='orders') {
            showOrders();
        } else if (command[0] === 'search' && command[1] === 'orders') {
            console.log('Search for orders:');
            process.stdin.once('data', (input) => {
                const filter = input.toString().trim();
                searchOrders(filter);
            });
        } else if (command[0] === 'picklist') {
            showPicklist();
        } else if (command[0] === 'exit' || command[0] === 'quit') {
            console.log('Exiting program');
            process.exit();
        } else {
            console.log('Unknown command!');
            showMenu();
        }
    });
}

start();
