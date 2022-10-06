const {seq}=require('../connections/sequelize.connection');
const {product_model}=require('./products.model');
const {DataTypes}=require('sequelize');

function defineCategoryModel(){
    let category_model=seq.define('category',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        category_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue:seq.fn('NOW')
        }
    })

    //defining relation with products table, as products have category id as FK
    category_model.hasMany(product_model,{
        foreignKey:'category_id'
    });

    product_model.belongsTo(category_model,{
        foreignKey:'category_id'
    });

    return category_model
}

let category_model=defineCategoryModel();
module.exports={category_model}