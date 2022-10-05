const {seq}=require('../connections/sequelize.connection');
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

    return category_model
}

let category_model=defineCategoryModel();
module.exports={category_model}