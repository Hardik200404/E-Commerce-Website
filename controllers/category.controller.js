let {category_service_obj}=require('../services/category.service');

function create(req,res){
    category_service_obj.create_category(req.body.category_name)
    .then((data)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(201);
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
}

function fetchAll(req,res){
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
}

function fetchOne(req,res){
    category_service_obj.get_categories_byId(req.params.id)
    .then((data)=>{
        res.setHeader('content-type','application/json');
        if(data!==null){
            res.writeHead(200);
            res.end(JSON.stringify(data));
        }else{
            res.writeHead(500);
            res.end(JSON.stringify({
                "message":"Error Fetching Category"
            }))
        }
    })
}

function update(req,res){
    category_service_obj.update_category_byId(req.body.category_name,req.params.id)
    .then((data)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            "message":"Category Updated Successfully"
        }))
    })
    .catch((err)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        console.log("Error ",err);
        res.end(JSON.stringify({
            "message":"Error Updating Category"
        }))
    })
    
}

function delete_category(req,res){
    category_service_obj.delete_category_byId(req.params.id)
    .then(()=>{
        res.setHeader('content-type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            "message":"Category Deleted Successfully"
        }))
    })
    .catch((err)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        console.log("Error ",err);
        res.end(JSON.stringify({
            "message":"Error Deleting Category"
        }))
    })
}
module.exports={create,fetchAll,fetchOne,update,delete_category}