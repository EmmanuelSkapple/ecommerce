const express = require('express');
const router = express.Router();
const ShopRoute = require('./shop.route');

function loadRouter() {
  router.use(`/shop`,ShopRoute );
}

loadRouter();

module.exports = router;