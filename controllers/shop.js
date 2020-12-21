
const Product = require('../models/product');
const Cart = require('../models/cart');

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
        // console.log("GET cart", Product.fetchCartDetails());
        const cartDetails = Cart.getCart();
        console.log("CART DETAILS ", cartDetails);

        res.render('shop/cart', { docTitle: 'Your cart', path: '/cart', cartDetails: cartDetails });
    }

    postCart(req, res) {
        // console.log("post cart product id", req.body.productId);
        const product = Product.findById(req.body.productId);
        console.log("Shop js product ***************************", product);
        // Product.addToCart(product);
        Cart.addProduct(product.id, product.price);
        const cartDetails = Cart.getCart();
        console.log("CART DETAILS ", cartDetails);
        res.render('shop/cart', { docTitle: 'Your cart', path: '/cart', cartDetails: cartDetails });
    }

    products(req, res) {
        res.render('shop/', { docTitle: 'Products', path: "/products" });
    }

    getCheckout(req, res) {
        res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
    }

    getOrders(req, res) {
        res.render('shop/orders', { docTitle: 'Your orders', path: '/orders' })
    }

    getProductDetails(req, res) {
        Product.findById(req.params.id, (product) => {
            console.log("product ", product);
            res.render('shop/product-details', { docTitle: 'Product details', path: '/products', product: product })
        });
    }
}

module.exports = new ShopController();