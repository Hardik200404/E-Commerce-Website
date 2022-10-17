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
    if(req.body.items){
        product_service_obj.get_products_byIds(req.body.items)
        .then((products)=>{
            let presentProducts = products.map((role) => {
                return role.dataValues
            });

            let presentProductObj = {};
            for(let product of presentProducts) {
                let id = product.id;
                presentProductObj[id] = 1;
            }

            let requestedProducts = req.body.items;
            let flag=true;
            for(i of requestedProducts){
                if(!presentProductObj[i]) {
                    flag=false;
                    res.setHeader('content-type', 'application/json');
                    res.writeHead(404);
                    res.end(JSON.stringify({
                        message: `Product with id ${i} is not present`
                    }));
                    break;
                }
            }
            if(flag) return update(req,res,requestedProducts);
        })
    }else{
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    }
}

module.exports={product_validator,products_ids_validator}