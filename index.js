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
//==========================================