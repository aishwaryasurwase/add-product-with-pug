const Product = require('../models/product');

class AdminController {
    constructor() { }
    getAddProduct(req, res, next) {
        res.render('admin/add-product', { docTitle: 'Add product', path: '/admin/add-product' });
    }

    postAddProduct(req, res, next) {
        const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price, null, req.user._id);
        product.saveProduct(() => {
            res.redirect('/products');
        });
    }

    getProducts(req, res) {
        Product.fetchAll(products => {
            res.render('admin/products', { docTitle: 'Admin products', path: '/admin/products', prods: products });
        });
    }


    editProduct(req, res) {
        Product.findById(req.params.id, (product) => {
            console.log("EDit product ", product);
            if (!product) {
                return res.render('/')
            }
            res.render('admin/edit-product', { docTitle: 'Edit product', path: '/admin/edit-product', product: product, editing: 'editMode' });
        });
    }

    updateProduct(req, res) {
        const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price, req.body._id);
        product.saveProduct(() => {
            res.redirect('/products');
        });
        // const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);
        // product.modifyProduct(req.body._id, () => {
        //     console.log("Updated successfully");
        //     res.redirect('/admin/products');
        // });
    }

    deleteProduct(req, res) {
        Product.deleteById(req.params.id, (product) => {
            if (!product) {
                console.log("Failed to find product");
            }
            res.redirect('/admin/products');
        })
    }
}

module.exports = new AdminController();