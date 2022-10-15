require('dotenv').config();//need to import dotenv so that js can import port from .env 
module.exports={
    SECRET:process.env.JWT_SECRET,
    EXPIRY_TIME:process.env.JWT_EXPIRY_TIME
}