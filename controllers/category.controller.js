let {category_service_obj}=require('../services/category.service');
let {execute_with_sync}=require('../connections/sequelize.connection');
let express=require('express');
let category_router=express.Router();

//default category endpoint page
category_router.get('/',function(req,res){
    //wrapping our fetch inside execute with sync will create the schema
    //even if it doesn't exist
    execute_with_sync(
    category_service_obj.get_categories_all()
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
            "message":"Error Fetching Categories"
        }))
    })
    )
})

//getting category by id endpoint
category_router.get('/:id',function(req,res){
    //wrapping our fetch inside execute with sync will create the schema
    //even if it doesn't exist
    execute_with_sync(
        category_service_obj.get_categories_byId(req.params.id)
        .then((data)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(200);
            if(data!==null){
                res.end(JSON.stringify(data));
            }else{
                res.end(JSON.stringify({
                    "message":"Category not Found"
                }));
            }
        })
        .catch((err)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(500);
            console.log("Error ",err);
            res.end(JSON.stringify({
                "message":"Error Fetching Category"
            }))
        })
    )
})

//adding category
category_router.post('/',function(req,res){
    //wrapping our fetch inside execute with sync will create the schema
    //even if it doesn't exist
    execute_with_sync(
        category_service_obj.create_category(req.body)
        .then((data)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                "message":"Category Created Successfully"
            }))
        })
        .catch((err)=>{
            res.setHeader('content-type','application/json');
            res.writeHead(500);
            console.log("Error ",err);
            res.end(JSON.stringify({
                "message":"Error Creating Category"
            }))
        })
    )
})
module.exports={category_router};