const path = require('path');

const express = require('express');
const shopCntrl = require('../controllers/shop');

const router = express.Router();

router.get('/', shopCntrl.getIndex);
router.get('/products', shopCntrl.getProducts);
router.get('/cart', shopCntrl.getCart);
router.get('/checkout', shopCntrl.getCheckout);
router.get('/orders', shopCntrl.getOrders);


router.get('/product/:id', shopCntrl.getProductDetails);
router.post('/cart', shopCntrl.postCart);

module.exports = router;
