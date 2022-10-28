const {DataTypes}=require('sequelize');

module.exports=function(seq,sequelize){
    let role_model=seq.define('roles',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        role_name:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
    return role_model
}