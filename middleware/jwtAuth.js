require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    async validateJWT(req, res, next){
        try {
            let token = req.headers['x-access-token'];

            if(token){
                let decoded = await jwt.verify(token, process.env.JWT_ENCRYPTION);
                req.decoded = decoded;
                next();
            }else{
                res.status(401).json({'Error':'Add Token to header'});
            }
        }catch(err){
            return res.status(500).json({'Error': err});
        }
    }
}