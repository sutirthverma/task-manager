const { validateToken } = require("../services/authentication");

function checkForAuth(){
    return (req, res, next) => {
        const token = req.header('authorization').split(' ')[1];

        if(!token) return res.json({message: 'User not validated'});

        try{
            const userPayload = validateToken(token);
            req.user = userPayload;
        }catch(err){
            return res.status(400).json({message: err.message});
        }
        
        next();
    }
}

module.exports = {
    checkForAuth
}