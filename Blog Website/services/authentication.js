const jwt = require("jsonwebtoken")
const secret = "$uperMan@123";

function createToken(user){
    const token = jwt.sign(user,secret)
    return token;
}

function validateToken(token){
    const user = jwt.verify(token,secret);
    return user;
}

module.exports = {createToken,validateToken}