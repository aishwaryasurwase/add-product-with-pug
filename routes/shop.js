const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');
const { products } = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log("shop.js ", adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.pug'));
  const products = adminData.products;
  res.render('shop', { prods: products, docTitle: 'My Shop', path: '/' });
});

module.exports = router;
