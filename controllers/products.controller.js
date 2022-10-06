let {product_service_obj}=require('../services/products.service');
let {execute_with_sync}=require('../connections/sequelize.connection');
let express=require('express');
let products_router=express.Router();

//all prodcuts endpoint
products_router.get('/',function(req,res){
    //wrapping our fetch inside execute with sync will create the schema
    //even if it doesn't exist
    execute_with_sync(
        product_service_obj.get_products_all()
        .then((results)=>(results.map((data)=>data.dataValues)))
        .then((data)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(200);
            res.end(JSON.stringify(data));
        })
        .catch((err)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(500);
            console.log("Error ",err);
            res.end(JSON.stringify({
                "message":"Error fetching Products"
            }))
        })
    )
})

//getting product by id endpoint
products_router.get('/:id',function(req,res){
    //wrapping our fetch inside execute with sync will create the schema
    //even if it doesn't exist
    execute_with_sync(
        product_service_obj.get_product_byId(req.params.id)
        .then((data)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(200);
            if(data!==null){
                res.end(JSON.stringify(data));
            }else{
                res.end(JSON.stringify({
                    "message":"Product not Found"
                }));
            }
        })
        .catch((err)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(500);
            console.log("Error ",err);
            res.end(JSON.stringify({
                "message":"Error fetching Product"
            }))
        })
    )
})
    
//adding Product
products_router.post('/',function(req,res){
    //wrapping our fetch inside execute with sync will create the schema
    //even if it doesn't exist
    execute_with_sync(
        product_service_obj.create_product(req.body)
        .then((data)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                "message":"Product Created Successfully"
            }))
        })
        .catch((err)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(500);
            console.log("Error ",err);
            res.end(JSON.stringify({
                "message":"Error Creating Product"
            }))
        })
    )
})

module.exports={products_router};