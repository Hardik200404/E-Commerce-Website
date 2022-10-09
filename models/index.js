const db_config = require('../configs/db.config');
const Sequelize = require('sequelize');

let seq=new Sequelize(db_config.NAME,db_config.USER,db_config.PASSWORD,{
    host:db_config.HOST,
    port:3306,
    dialect:db_config.dialect,
    pool:db_config.pool
})

const db = {};
db.Sequelize = Sequelize;
db.seq = seq;
let category = require('./category.model')(seq,Sequelize);
let product = require('./products.model')(seq,Sequelize);

// category.hasMany(product);
// product.belongsTo(category);
category.hasMany(product,{
    foreignKey:'category_id'
});
product.belongsTo(category,{
    foreignKey:'category_id'
});

db.category = category;
db.product = product;

module.exports = db;