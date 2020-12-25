const fs = require('fs');
const utilPath = require('../util/path');
const path = require('path');
// const { products } = require('../controllers/shop');

const p = path.join(utilPath, 'data', 'products.json');
const mongoConnect = require('../util/database');
const { ObjectId } = require('mongodb');
var db;

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
    constructor(title, imageUrl, description, price, id, userId) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this._id = id ? ObjectId(id) : null;
        this.userId = userId;
    }

    saveProduct(cb) {
        if (this._id) {
            db.collection('products').updateOne({ _id: ObjectId(this._id) }, {
                $set: {
                    title: this.title,
                    imageUrl: this.imageUrl,
                    description: this.description,
                    price: this.price
                }
            }).then(() => {
                cb("Product updated successfully");
            }).catch((err) => {
                console.log("Failed to find product into database");
                throw err;
            });
        } else {
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

    modifyProduct(id, cb) {
        db.collection('products').updateOne({ _id: ObjectId(id) }, {
            $set: {
                title: this.title,
                imageUrl: this.imageUrl,
                description: this.description,
                price: this.price
            }
        }).then(() => {
            cb("Product updated successfully");
        }).catch((err) => {
            console.log("Failed to find product into database");
            throw err;
        });
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
            cb(product);
        }).catch(err => {
            console.log("error ", err);
            cb([]);
        })
    }

    static deleteById(id, cb) {
        db.collection('products').deleteOne({ _id: ObjectId(id) }).then((result) => {
            cb('success');
        }).catch(err => {
            console.log("error", err);
        })
    }

    // static findById(id) {
    //     return products.find(product => product.id == id);
    // }
}