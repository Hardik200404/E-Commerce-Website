const {DataTypes}=require('sequelize');
module.exports=function(seq,sequelize){
    let cart_model=seq.define('carts',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        cost:{
            type:DataTypes.FLOAT
        }
    })
    return cart_model
}