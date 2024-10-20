require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 8000;

const {
    connectDB
} = require('./connection');

//Routers
const userRouter = require('./routes/user_route');

connectDB(process.env.MONGO_URL)
.then(() => console.log(`Connected To DB`))

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/user', userRouter);

app.get('/', function(req, res){
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server started`);    
});