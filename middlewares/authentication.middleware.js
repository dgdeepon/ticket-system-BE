const jsonwebtoken = require('jsonwebtoken');
require("dotenv").config();

async function authentication(req,res, next){
    const token = req.headers.authorization.split(' ')[1];
    if(token){
        const decode = jsonwebtoken.verify(token, process.env.USERS_JSON_SIGN_KEY);
        if(decode){
            req.body['userId'] = decode.id;
            next();
        }else{
            res.status(401).json({message:"Failed to verify the user."});
        }
    }else{
        res.status(401).json({message:"Please login first."});
    }
};


module.exports = authentication;