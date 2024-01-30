const { validateToken } = require("../services/authentication");

function checkForAuthentication(){
    return (req,res,next)=>{
        const token = req.cookies.token;
        if(!token){
             next()
        }
        else {
            const user = validateToken(token);
            req.user = user;
            next()
        }
    }
}
module.exports = checkForAuthentication