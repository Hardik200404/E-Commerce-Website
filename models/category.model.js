const {DataTypes}=require('sequelize');

module.exports=function(seq,sequelize){
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
        }
    })
    return category_model
}