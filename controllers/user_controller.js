const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/authentication');

async function handleUserSignUp(req, res) {
    try {
        const { username, email, password } = req.body;

        await User.create({
            username,
            email,
            password
        });

        return res.json({ message: 'Signed Up Successfully' })
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}

async function handleUserSingIn(req, res){
    try{
        const { email, password } = req.body;
        console.log(`${email}\n${password}`);

        const user = await User.findOne({email});

        if(!user) throw new Error('Invalid Credentials');
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) throw new Error('Invalid Credentials');

        const token = createToken(user);

        return res.json({
            message: 'Signed in successfully',
            token
        });   
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

module.exports = {
    handleUserSignUp,
    handleUserSingIn
}