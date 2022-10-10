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

module.exports={product_validator}