// Webbklienten
// start node index.js
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');

const { showCategories }= require("./src/category.js");
const { showCustomers } = require("./src/customer.js");
const myOrder  = require("./src/order.js");
const product = require("./src/product.js");
const routes = require("./router.js");
const port = 1337;
app.use(methodOverride("_method"));

app.use(express.static("public"));

// Search to find map with HTML, CSS, imgaes.
app.use(express.static("eshop"));

// EJS as view engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'hemlig-nyckel-här',
    resave: false,
    saveUninitialized: false
  }));

app.use("/", routes);

// Route to welcome page.
app.get(`/eshop/index`, (req, res) => {
    res.render("index");
});

// Route to about page.
app.get(`/eshop/about`, (req, res) => {
    res.render("about");
});

// Route for product.
app.get(`/eshop/product`, async (req, res) => {
    try {
        const products = await product.webbProducts();

        res.render("product", {products});
    } catch (error) {
        console.error("Error showing product", error);
        res.status(500).send("Error showing product");
    }
});

// Route for category.
app.get(`/eshop/category`, async (req, res) => {
    try {
        const categories = await showCategories();

        res.render("category", {categories});
    } catch (error) {
        console.error("Error showing category", error);
        res.status(500).send("Error showing category");
    }
});

app.get(`/eshop/customer`, async (req, res) => {
    try {
        const customers = await showCustomers();

        res.render("customer", {customers});
    } catch (error) {
        console.error("Error showing customer", error);
        res.status(500).send("Error showing customer");
    }
});

app.get(`/eshop/order`, async (req, res) => {
    try {
        let order = await myOrder.visaKundOrder();
        console.log(order);

        //orders = Array.isArray(orders) ? orders : [];

        res.render("order", {orders: order});
    } catch (error) {
        console.error("Error showing orders", error);
        //res.render("error", {orders: []});
    }
});



// Listen for 1337 port.
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
