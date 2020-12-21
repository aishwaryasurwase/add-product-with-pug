const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const adminCntrl = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminCntrl.getAddProduct);
router.get('/products', adminCntrl.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminCntrl.postAddProduct);
router.post('/delete-product/:id', adminCntrl.deleteProduct);
router.get('/edit-product/:id', adminCntrl.editProduct);
router.post('/edit-product', adminCntrl.updateProduct);

module.exports = router
