const authConfig = require('../configs/auth.config');
const jwt=require('jsonwebtoken');

class jwt_service{
    create_jwt_token(payload){
        let token=jwt.sign(payload,
            authConfig.SECRET, {
                expiresIn: authConfig.EXPIRY_TIME
            });
        return `Bearer ${token}`
    }

    verify_jwt_token(token){
        if(token && token.includes('Bearer')){
            token = token.substring(7);
            let decoded=jwt.verify(token,authConfig.SECRET)
            return {validated:true,decoded_jwt:decoded}
        }
    }
}

let jwt_service_obj=new jwt_service;
module.exports={jwt_service_obj}