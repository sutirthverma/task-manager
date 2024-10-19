const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto');

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

userSchema.pre('matchPassword', async function(email, password){
    const user = await this.findOne({email});

    if(!user) throw new Error('Incorrect Email/Password');

    const salt = user.salt;
    const hashedPassword = user.hashedPassword;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');
    
    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Email/Password');

    const token = '';

    return token;
});

const User = new mongoose.model('users', userSchema);

module.exports = User;