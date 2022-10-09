let {product_service_obj}=require('../services/products.service');

function create(req,res){
    let product={
        category_id:req.body.category_id,
        product_name:req.body.product_name,
        description:req.body.description,
        price:req.body.price
    }
    if(product.category_id && product.product_name && product.description){
        product_service_obj.create_product(product)
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
    let updated_product={
        category_id:req.body.category_id,
        product_name:req.body.product_name,
        description:req.body.description,
        price:req.body.price
    }
    if(updated_product.category_id && updated_product.product_name && updated_product.description){
        product_service_obj.update_product_byId(updated_product,req.params.id)
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
    else{
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    }
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