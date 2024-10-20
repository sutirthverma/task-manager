const mongoose = require('mongoose');
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

userSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.static('matchPassword', async function(email, password){
    const user = await this.findOne({email});

    if(!user) throw new Error('Incorrect Email/Passworddd');

    const salt = await user.salt;
    const hashedPassword = await user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');
    
    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Email/Password');

    const token = createToken(user);

    return token;
});

const User = new mongoose.model('users', userSchema);

module.exports = User;