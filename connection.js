const mongoose = require('mongoose');

async function connectDB(path){
    try{
        await mongoose.connect(path);
    }catch(err){
        console.log(err.message);        
    }
}

module.exports = {
    connectDB
}