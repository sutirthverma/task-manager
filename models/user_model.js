const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createHmac, randomBytes } = require('node:crypto');
const { createToken } = require('../services/authentication');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
}, { timestamps: true });

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')) return;

    user.password = await bcrypt.hash(user.password, 8);
    next();
});


const User = new mongoose.model('users', userSchema);

module.exports = User;