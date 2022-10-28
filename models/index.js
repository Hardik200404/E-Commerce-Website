const db_config = require('../configs/db.config');
const Sequelize = require('sequelize');

//defining Database connection credentials 
let seq=new Sequelize(db_config.NAME,db_config.USER,db_config.PASSWORD,{
    host:db_config.HOST,
    port:3306,
    dialect:db_config.dialect,
    pool:db_config.pool
})

let category = require('./category.model')(seq,Sequelize);
let product = require('./products.model')(seq,Sequelize);
let user = require('./users.model')(seq,Sequelize);
let role = require('./roles.model')(seq,Sequelize);
let cart = require('./cart.model')(seq,Sequelize);

//defining One to Many mapping for category and products
category.hasMany(product,{
    foreignKey:'category_id'
});
product.belongsTo(category,{
    foreignKey:'category_id'
});

//defining Many to Many mapping for user and role 
//user_roles will be a diff table to hold the mapping with given two keys
role.belongsToMany(user,{
    through:'user_roles',
    foreignKey:'role_id',
    otherKey:'user_id'
})
user.belongsToMany(role,{
    through:'user_roles',
    foreignKey:'user_id',
    otherKey:'role_id'
})

//defining Many to Many mapping for product and cart
//product_cart will be a diff table to hold the mapping with given two keys
cart.belongsToMany(product,{
    through:'product_cart',
    foreignKey:'cart_id',
    otherKey:'product_id'
})
product.belongsToMany(cart,{
    through:'product_cart',
    foreignKey:'product_id',
    otherKey:'cart_id'
})

//defining relation of user and cart, as user can have different carts through time
user.hasMany(cart);
cart.belongsTo(user);

const db = {};
db.Sequelize = Sequelize;
db.seq = seq;
db.category = category;
db.product = product;
db.user=user;
db.role=role;
db.cart=cart;
//now db object has all the models and sequelize function

module.exports = db;