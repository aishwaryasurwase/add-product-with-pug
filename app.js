const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorCntrl = require('./controllers/error');
const mongoConnect = require('./util/database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// db.execute('SELECT * FROM PRODUCTS').then().catch()

app.use('/admin', adminRoutes);
app.use(shopRoutes)

// app.use((req, res, next) => {
//     // res.sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
//     res.render('page-not-found', { docTitle: 'Page not found', path: '/page-not-found' });
// });

app.use(errorCntrl.pageNotFound);
mongoConnect((error, result) => {
    if (error) {
        return console.log("ERROR ", error);
    }
    console.log("Connected to database successfully",);
    app.listen(3000);
})

