let {product_service_obj}=require('../services/products.service');

function create(req,res){
    product_service_obj.create_product(req.body)
    .then((data)=>{
        let return_value=data.dataValues
        return_value.message="Product Created Successfully"
        res.setHeader('content-type','application/json');
        res.writeHead(201);
        res.end(JSON.stringify(return_value))
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

function fetchAll(req,res){
    product_service_obj.get_products_all(req.query)
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
}

function fetchOne(req,res){
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
}

function update(req,res){
    product_service_obj.update_product_byId(req.body,req.params.id)
    .then((data)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            "message":"Product Updated Successfully"
        }))
    })
    .catch((err)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        console.log("Error ",err);
        res.end(JSON.stringify({
            "message":"Error Updating Product"
        }))
    })
}

function delete_product(req,res){
    product_service_obj.delete_product_byId(req.params.id)
    .then(()=>{
        res.setHeader('content-type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            "message":"Product Deleted Successfully"
        }))
    })
    .catch((err)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        console.log("Error ",err);
        res.end(JSON.stringify({
            "message":"Error Deleting Product"
        }))
    })
}

module.exports={create,fetchAll,fetchOne,update,delete_product};