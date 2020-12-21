// const mysql = require('mysql');
// // var pool = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     database: 'node',
// //     password: 'root'
// // })
// // pool.getConnection(function (err, connection) {
// //     if (err) {
// //         return console.log("Error in connecting with database.");
// //     }
// //     console.log("Connected to database");
// // });
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'node',
//     port: 3306
// })

// con.connect((err) => {
//     if (err) {
//         return console.log("Error in connecting with database.");
//     }
//     console.log("Connected to database");
// })

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://aishwarya:AukatMeReh@710@cluster0.2xjqf.mongodb.net/node-complete?retryWrites=true&w=majority', { useUnifiedTopology: true })
        .then((result) => {
            callback(undefined, result);
        }).catch((err) => {
            callback(err, undefined);
        })
}
module.exports = mongoConnect;