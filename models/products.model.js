// const {seq}=require('../connections/sequelize.connection');

// function defineProductModel(){
//     let product_model=seq.define('products',{
//         id:{
//             type:DataTypes.INTEGER,
//             autoIncrement:true,
//             allowNull:false,
//             primaryKey:true
//         },
//         category_id:{
//             type:DataTypes.INTEGER,
//             allowNull:false,
//         },
//         product_name:{
//             type:DataTypes.STRING,
//             allowNull:false,
//         },
//         description:{
//             type:DataTypes.STRING,
//             allowNull:false,
//         },
//         price:{
//             type:DataTypes.FLOAT,
//             allowNull:false,
//             defaultValue:0.0
//         },
//         created_at:{
//             type:DataTypes.DATE,
//             defaultValue:seq.fn('NOW'),
//         }
//     })

//     return product_model
// }

// let product_model=defineProductModel();
// module.exports={product_model}

const {DataTypes}=require('sequelize');
module.exports=function(seq,sequelize){
    let product_model=seq.define('products',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        category_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        product_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,
            defaultValue:0.0
        },
    })
    return product_model
}