const path = require('path');
const fs = require('fs');

const utilPath = require('../util/path');
let cart = { products: [], totalPrice: 0 };

module.exports = class Cart {
    constructor() {

    }

    static addProduct(id, productPrice) {
        const p = path.join(utilPath, 'data', 'cart.json');
        // Fetch previous cart
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                cart = JSON.parse(fileContent);
                console.log(JSON.parse(fileContent));
            }
        });

        // Analyse the cart => Find existing product
        const existingProductIndex = cart.products.findIndex(product => product.id == id);
        const existingProduct = cart.products[existingProductIndex];

        let updatedProduct;
        // Add new product/ increase quantity
        if (existingProduct) {
            updatedProduct = { ...existingProduct };
            updatedProduct.qty = +updatedProduct.qty + 1;

            // console.log("product found", updatedProduct);
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;

        } else {
            // console.log("new product");
            updatedProduct = {
                id: id,
                qty: 1
            }
            cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p, JSON.stringify(cart), (err, data) => {
            // console.log(err);
        })
    }

    static getCart() {
        return cart;
    }
}