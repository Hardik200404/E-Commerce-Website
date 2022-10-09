let {category_service_obj}=require('../services/category.service');

function create(req,res){
    let category={
        category_name:req.body.category_name
    }
    if(category.category_name){
        category_service_obj.create_category(category)
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
                "message":"Error Creating Product"
            }))
        })
    }
    else{
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    }
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
}

function update(req,res){
    let updated_category={
        category_name:category_name
    }
    if(updated_category.category_name){
        category_service_obj.update_category_byId(updated_category,req.params.id)
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
    else{
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    }
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