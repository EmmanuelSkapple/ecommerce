const express = require('express');
const container = require('../ioc');
const Firebase = require('../auth/firebase');
const MySQLDB = require('../db');
const Shop = container.get('shop.repository');

const router = express.Router();
const firebase = new Firebase();

router.get("/get-products", firebase.validateFirebaseToken, async (req, res) => {
  const user = req.user;
  const reqShop = await Shop.getProducts(req.body);
  res.send(reqShop);
});

router.post("/add-product", firebase.validateFirebaseToken, async (req, res) => {
  const reqShop = await Shop.createProduct(req.body.product);
  res.send(reqShop);
});

router.post("/edit-product", firebase.validateFirebaseToken, async (req, res) => {
  const reqShop = await Shop.editProduct(req.body.product);
  res.send(reqShop);
});

router.post("/delete-product", firebase.validateFirebaseToken, async (req, res) => {
  const reqShop = await Shop.deleteProduct(req.body.id);
  res.send(reqShop);
});

module.exports = router;
