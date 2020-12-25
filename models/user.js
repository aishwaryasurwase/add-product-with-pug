// const { ObjectId } = require('mongodb');
// const mongoConnect = require('../util/database');
// let db;

// mongoConnect((err, result) => {
//     if (err) {
//         return err;
//     }
//     db = result.db();
// })

// class User {
//     constructor(username, email, items, id) {
//         this.username = username,
//             this.email = email,
//             this.items = items // items
//         this._id = id // user id
//     }

//     saveUser(cb) {
//         db.collection('users').insertOne(this).then((data) => {
//             cb(console.log("User added successfully"));
//         }).catch((err) => {
//             console.log("Failed to add new user");
//         })
//     }

//     static fetchUserById(userId, cb) {
//         db.collection('users').findOne({ _id: ObjectId(userId) }).then(user => {
//             cb(user);
//         }).catch((err) => {
//             console.log("Not found");
//         })
//     }

//     static addToCart(product, cb) {

//         db.collection('users').findOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902'), "items.productId": ObjectId(product._id) }).then(prod => {
//             if (prod) {
//                 db.collection('users').updateOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902'), "items.productId": ObjectId(product._id) },
//                     { $inc: { "items.$.quantity": 1 } }).then(() => {
//                         cb("success");
//                     }).catch((err) => {
//                         console.log("ERROR", err);
//                     });
//             } else {
//                 const updatedProduct = { productId: product._id, quantity: 1 };
//                 db.collection('users').updateOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902') }, { $push: { items: updatedProduct } }).then(() => {
//                     cb("success");
//                 }).catch((err) => {
//                     console.log("ERROR", err);
//                 });
//             }
//         }).catch((err) => {
//             console.log("err", err);
//         });

//         // const updatedProduct = { items: [{ productId: product._id, quantity: 1 }] };
//         // console.log("update product", updatedProduct);
//         // db.collection('users').updateOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902') }, { $set: { cart: updatedProduct } }).then(() => {
//         //     cb("success");
//         // }).catch((err) => {
//         //     console.log("ERROR", err);
//         // });
//     }

//     // getCart(userId, cb) {
//     //     // db.collection('users').findOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902') }).then((user) => {

//     //     // const cartItems = user.items;
//     //     const cartItemsproduct = [];
//     //     console.log("items ", this.items);
//     //     this.items.map(item => {
//     //         db.collection('products').findOne({ _id: ObjectId(item.productId) }).then((data) => {
//     //             cartItemsproduct.push({ ...data, 'productId': item.productId, 'quantity': item.quantity });
//     //             console.log("cartItemsproduct *******", cartItemsproduct);
//     //         })
//     //     })
//     //     console.log("cartItemsproduct", cartItemsproduct);
//     //     cb(cartItemsproduct);
//     //     // })

//     //     // .catch((err) => {
//     //     //     console.log("error", err);
//     //     // })
//     // }

//     getCart() {
//         const productIds = this.items.map(i => {
//             return i.productId;
//         });
//         return db
//             .collection('products')
//             .find({ _id: { $in: productIds } })
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p,
//                         quantity: this.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     };
//                 });
//             });
//     }

//     static addOrder(userId, cb) {
//         getCart().then((result) => {
//             console.log(result);
//             console.log("*****************************");
//         })
//         // db.collection('users').findOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902') }).then(user => {
//         //     db.collection('orders').updateOne({ userId: ObjectId('5fe17a0b8bb9a782ea1b6902') }, { $push: { 'items': user.items } }, { upsert: true }).then((result) => {
//         //         db.collection('users').updateOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902') }, { $set: { 'items': [] } }).then(() => {
//         //             this.items = [];
//         //             cb('order placed');
//         //         })
//         //     }).catch(err => {
//         //         console.log(err);
//         //     })
//         // }).catch((err) => {
//         //     console.log("Not found");
//         // })
//     }

//     static getOrders(userId, cb) {
//         db.collection('orders').findOne({ userId: ObjectId('5fe17a0b8bb9a782ea1b6902') }).then((result) => {
//             console.log("orders ", result.items);
//             cb(result.items);
//         }).catch(err => {
//             console.log("Error ", err);
//         })
//     }

//     static deleteItem(productId, cb) {
//         db.collection('users').updateOne({ _id: ObjectId('5fe17a0b8bb9a782ea1b6902') }, { $pull: { "items": { "productId": ObjectId(productId) } } }).then(() => {
//             cb();
//         }).catch((err) => {
//             console.log("ERROR ", err);
//         })
//     }
// }
// module.exports = User;

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({

});
module.exports = userSchema;