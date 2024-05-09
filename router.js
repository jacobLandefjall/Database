/**
 * Router for index.js
 */
const express = require("express");
const router = express.Router();
const productCrud = require("./src/crud.js");
const product = require("./src/product.js");
const config = require("./config/db/eshop.json");
const order = require("./src/order.js");

router.get("/about", (req, res) => {
    res.render("/about.ejs");
});

router.get("/index", (req, res) => {
    res.render("/index.ejs");
});

router.get("/category", (req, res) => {
    res.render("/category.ejs");
});

router.get("/product", async (req, res) => {
    let data = { allProducts: await product.showProducts() };

    res.render("/product.ejs", data);
});

router.get("/product/:id", async (req, res) => {
    let id = req.params.id;
    let data = { product: await product.getProdectById(id) };

    res.render("productDetail.esj", data);
});

router.get("/product", async (req, res) => {
    await productCrud.createProduct(req.body.namn, req.body.pris);
    res.redirect("/product");
});

router.put("/product/:id", async (req, res) => {
    await productCrud.updateProduct(req.params.id, req.body.namn, req.body.pris);
    res.redirect("/product" + req.params.id);
});

router.post("/eshop/product/delete/:id", async (req, res) => {
    console.log(" Radera produkt med id: ", req.params.id);
    try {
        const produktID = req.params.id;

        await productCrud.TaBortProdukt(produktID);
        res.redirect("/eshop/product");
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(500).send("Error deleting product");
    }
});

router.post("/eshop/product", async (req, res) => {
    try {
        const { namn, pris} = req.body;

        await productCrud.skapaProdukt(namn, pris);
        res.redirect("/eshop/product");
    } catch (error) {
        console.error("Error adding product", error);
        
    }
});
router.post("/eshop/product/update/:id", async (req, res) => {
    try {
        const { namn, pris } = req.body;
        const produktID = req.params.id;

        await productCrud.uppdateraProdukt(produktID, namn, pris );
        res.redirect("/eshop/product");
    } catch (error) {
        console.error("Error updating product", error);
        res.status(500).send("Error updating product");
    }
});
router.get("/customer", (req, res) => {
    res.render("/customer.ejs");
});

router.get("/order", async (req, res) => {

    let orders = await order.visaKundOrder(); 
    orders = [orders];
    console.log(orders); // Lägg till för felsökning
    res.render("order",  orders ); //orders är ett objekt inte lista
    
});

router.post("/order", async (req, res) => {
    try {
        const { kund_id, produkt_id, antal, namn, pris } = req.body;
        
        console.log("Creating new order with: ", { kund_id, produkt_id, antal, namn, pris });

        await order.skapaOrder(kund_id, produkt_id, antal, datum, faktura);
    } catch (error) {
        console.error("Error adding order:", error);
        
    }
});


module.exports = router; // Export the router.
