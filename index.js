const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));

const serverPort = process.env.SERVER_PORT || 3000;

//==========================================
const CategoryRoute = require('./route/CategoryRoute');
const CartRoute = require('./route/CartRoute');
const BookmarkRoute = require('./route/BookmarkRoute');
const ReviewRoute = require('./route/ReviewRoute');
const ProductRoute = require('./route/ProductRoute');
const DiscountRoute = require('./route/DiscountRoute');
const CountryRoute = require('./route/CountryRoute');
//==========================================

try {
    mongoose.connect(`${process.env.DATABASE_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    app.listen(serverPort, () => {
        console.log(`Server is running on port ${serverPort}`);
    });

} catch (error) {
    console.log('Database connection failed', error);
}

app.get('/test-api', (request, response) => {
    return response.json({ message: 'API is working' });
})

// http://localhost:3000/api/v1/categories/create-category (POST)
//==========================================
app.use('/api/v1/categories', CategoryRoute);
app.use('/api/v1/carts', CartRoute);
app.use('/api/v1/bookmarks', BookmarkRoute);
app.use('/api/v1/reviews', ReviewRoute);
app.use('/api/v1/products', ProductRoute);
app.use('/api/v1/discounts', DiscountRoute);
app.use('/api/v1/countries', CountryRoute);
//==========================================