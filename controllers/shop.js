
const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

class ShopController {
    constructor() { }

    getIndex(req, res) {
        res.render('shop/index', { docTitle: 'My Shop', path: '/' });
    }

    getProducts(req, res) {
        Product.fetchAll(products => {
            res.render('shop/product-list', { prods: products, docTitle: 'All products', path: '/products' });
        });
    }

    getCart(req, res) {
        req.user
            .getCart()
            .then(products => {
                res.render('shop/cart', {
                    path: '/cart',
                    docTitle: 'Your Cart',
                    products: products
                });
            })
            .catch(err => console.log(err));
    }

    // getCart(req, res) {
    //     req.user.getCart("userId", (products) => {
    //         console.log("CART DETAILS ", products);
    //         res.render('shop/cart', { docTitle: 'Your cart', path: '/cart', products: products });
    //     });
    // }

    getOrders(req, res) {
        User.getOrders('userId', (orders) => {
            res.render('shop/orders', { docTitle: 'Your orders', path: '/orders', orders: orders })
        })
    }

    postCart(req, res) {
        Product.findById(req.body.productId, (product) => {
            User.addToCart(product, () => {
                res.redirect('cart');
            })
        });
    }

    products(req, res) {
        res.render('shop/', { docTitle: 'Products', path: "/products" });
    }

    getCheckout(req, res) {
        res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
    }

    getProductDetails(req, res) {
        Product.findById(req.params.id, (product) => {
            res.render('shop/product-details', { docTitle: 'Product details', path: '/products', product: product })
        });
    }

    addOrder(req, res) {
        User.addOrder("userId", (result) => {
            console.log("RESULT ", result);
            res.redirect('orders')
        })
    }

    deleteItemFromCart(req, res) {
        User.deleteItem(req.body.productId, () => {
            res.redirect('cart');
        })
    }
}

module.exports = new ShopController();