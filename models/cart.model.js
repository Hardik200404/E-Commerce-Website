const {DataTypes}=require('sequelize');
module.exports=function(seq,sequelize){
    let cart_model=seq.define('cart',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        cost:{
            type:DataTypes.INTEGER
        }
    })
    return cart_model
}