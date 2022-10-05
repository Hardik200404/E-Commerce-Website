require('dotenv').config();//need to import dotenv so that js can import port from .env 
module.exports={
    PORT:process.env.PORT
}