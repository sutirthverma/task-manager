require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 8000;

const {
    connectDB
} = require('./connection');

connectDB(process.env.MONGO_URL)
.then(() => console.log(`Connected To DB`))

app.listen(PORT, () => {
    console.log(`Server started`);    
});