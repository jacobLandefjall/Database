// Webbklienten
// start node index.js
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');

const { showCategories }= require("./src/category.js");
const { showCustomers } = require("./src/customer.js");
const { skapaNyOrder } = require("./src/order.js");
const { visaAllaOrder } = require("./src/order.js");
const { orderDetaljer } = require("./src/order.js");
const { completeOrder } = require('./src/order');
const { visaOrder } = require('./src/order.js');
const myOrder  = require("./src/order.js");
const { visaKundOrder} = myOrder;
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
        const orders = await visaAllaOrder();
        for (let order of orders) {
            await completeOrder([order.Bestallnings_id]);
        }
        res.render("order", { orders });
    } catch (error) {
        console.error("Error showing orders", error);
        res.render("order", { orders: [] });
    }
});

app.post(`/eshop/order`, async (req, res) => {
    const { kundId, datum } = req.body;
    if (kundId === undefined || isNaN(parseInt(kundId))) {
        console.error("Invalid kundId", kundId);
        res.status(400).send("Invalid kundId");
        return;
    }

    const produkter = Object.keys(req.body)
        .filter(key => key.startsWith('antal_'))
        .map(key => {
            const produkt_id = key.split('_')[1];
            const antal = req.body[key];
            return { produkt_id, antal };
        });

    try {
        await skapaNyOrder(kundId, produkter);
        res.redirect(`/eshop/order?kundId=${kundId}`);
    } catch (error) {
        console.error("Error creating order", error);
    }
});

app.post('/eshop/order/:orderId', async (req, res) => {
    const {orderId} = req.params;
    const {produkt_id, antal} = req.body;
    try {
        await myOrder.laggTillOrderrad(orderId, produkt_id, antal);
        res.status(201).send('Product added to order');
    } catch (error) {
        console.error('Error adding product to order', error);
    }
});

app.get(`/eshop/order/:orderId`, async (req, res) => {
    const orderId = req.params.orderId;
    console.log(`Details for order ${orderId}`);
    let order = null;
    let orderRader = [];
    let error = null;

    try {
        const result = await orderDetaljer(orderId);
        order = result.orderInfo;
        orderRader = result.orderRader;
    } catch (err) {
        console.error("Error showing orders", err.message);
        error = err.message;
    }

    res.render("orderDetail", { order, orderRader, error });
});

// Listen for 1337 port.
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
