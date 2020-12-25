const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

const errorCntrl = require('./controllers/error');
const mongoConnect = require('./util/database');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// db.execute('SELECT * FROM PRODUCTS').then().catch()
app.use((req, res, next) => {
    User.fetchUserById('5fe17a0b8bb9a782ea1b6902', (user) => {
        if (user) {
            // console.log("user", user);
            req.user = new User(user.username, user.email, user.items, user._id);
            next();
        }
    })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes)

// app.use((req, res, next) => {
//     // res.sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
//     res.render('page-not-found', { docTitle: 'Page not found', path: '/page-not-found' });
// });

app.use(errorCntrl.pageNotFound);
// mongoConnect((error, result) => {
//     if (error) {
//         return console.log("ERROR ", error);
//     }
//     console.log("Connected to database successfully",);
//     app.listen(3000);
// })

mongoose.connect('mongodb+srv://aishwarya:AukatMeReh@710@cluster0.2xjqf.mongodb.net/node-complete?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true }).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})