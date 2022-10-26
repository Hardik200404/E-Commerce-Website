require('dotenv').config();

module.exports={
    HOST:process.env.DB_HOST,
    USER:process.env.DB_USER,
    PASSWORD:process.env.DB_PASSWORD,
    NAME:process.env.DB_NAME,
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        aqquire:30000,
        idle:10000
    }
}

// //config file for hosted database
// module.exports = require('../config/config.json');