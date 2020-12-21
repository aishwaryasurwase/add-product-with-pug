const fs = require('fs');
const utilPath = require('../util/path');
const path = require('path');
// const { products } = require('../controllers/shop');
let products = [];
const p = path.join(utilPath, 'data', 'products.json');
const mongoConnect = require('../util/database');
const { ObjectId } = require('mongodb');
let db;

getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([])
        }
        cb(JSON.parse(fileContent));
    })
}

mongoConnect((error, result) => {
    if (error) {
        return console.log(error);
    }
    db = result.db();
})

module.exports = class Product {
    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this._id = ObjectId(id)
    }

    saveProduct(cb) {
        if (this._id) {
            //update product
            db.collection('products').updateOne({ _id: this._id }, { $set: this }).then(() => {
                console.log("Product found");
                cb("Product updated successfully");
            }).catch((err) => {
                console.log("Failed to find product into database");
                throw err;
            });
        } else {
            //create product
            db.collection('products').insertOne(this).then(() => {
                console.log("Product added into database successfully");
                cb('Product added into database successfully');
            }).catch((err) => {
                console.log("Failed to add product into database");
                throw err;
            });
        }
        // getProductsFromFile(products => {
        //     this.id = Math.random().toString();
        //     products.push(this);
        //     fs.writeFile(p, JSON.stringify(products), (err, data) => {
        //         alert(err);
        //     })
        // })
    }

    static fetchAll(cb) {
        // getProductsFromFile(cb);
        db.collection('products').find().toArray()
            .then(products => {
                // console.log("products ", products);
                cb(products);
            }).catch(err => {
                console.log("error", err);
                return [];
            })
    }

    static findById(productId, cb) {
        db.collection('products').findOne({ _id: ObjectId(productId) }).then((product) => {
            // console.log("product ", product);
            cb(product);
        }).catch(err => {
            console.log("error ", err);
            cb([]);
        })
    }

    // static findById(id) {
    //     return products.find(product => product.id == id);
    // }
}