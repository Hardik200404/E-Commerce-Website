function product_validator(req,res,next){
    let product={
        category_id:req.body.category_id,
        product_name:req.body.product_name,
        description:req.body.description,
        price:req.body.price
    }
    if(product.category_id && product.product_name && product.description){
        next();
    }else{
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    }
}

let {product_service_obj}=require('../services/products.service');
let {update}=require('../controllers/cart.controller');
function products_ids_validator(req,res,next){
    product_service_obj.get_products_byIds(req.body.items)
    .then((products)=>{
        if(products){
            return update(req,res,products);
        }else{
            res.setHeader('content-type','application/json');
            res.writeHead(404);
            res.end(JSON.stringify({
                "message":"Product Not Found"
            }))
        }
    }).catch((err)=>{
        console.log('error while fetching products by ids ',err);
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    })
}

module.exports={product_validator,products_ids_validator}