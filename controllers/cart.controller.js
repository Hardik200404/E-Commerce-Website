let {cart_service_obj}=require('../services/cart.service');
function create(req,res){
    let user_id=req.decoded_jwt.id;
    let cost=0;
    let cart={
        userId:user_id,
        cost:cost
    }
    cart_service_obj.create_cart(cart)
    .then((cart)=>{
        cart=cart.dataValues;
        res.setHeader('content-type','application/json');
        res.writeHead(201);
        res.end(JSON.stringify({
            cart,
            "message":"Cart Created Successfully"
        }))
    }).catch((err)=>{
        console.log('error while creating cart ',err);
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            "message":"Error Creating Cart"
        }))
    })
}

function update(req,res,products,cost){
    let cart_id=req.params.id;
    cart_service_obj.get_cart_byId(cart_id)
    .then((cart)=>{
        if(cart){
            cart.setProducts(products)
            cart['cost']=cost
            cart=cart.dataValues;
            cart_service_obj.update_cart(cart,cart_id)
            .then((cart)=>{
                res.setHeader('content-type','application/json');
                res.writeHead(201);
                res.end(JSON.stringify({
                    "message":"Cart Updated Successfully"
                }))
            })
        }else{
            res.setHeader('content-type','application/json');
            res.writeHead(404);
            res.end(JSON.stringify({
                "message":"Cart Not Found"
            }))
        }
    }).catch((err)=>{
        console.log('error while updating cart ',err)
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            "message":"Error Updating Cart"
        }))
    })
}

function get_cart(req,res){
    cart_service_obj.get_cart_byId(req.params.id)
    .then((cart)=>{
        if(cart){
            res.setHeader('content-type','application/json');
            res.writeHead(200);
            res.end(JSON.stringify({cart}))
        }else{
            res.setHeader('content-type','application/json');
            res.writeHead(404);
            res.end(JSON.stringify({
                "message":"Cart Not Found"
            }))
        }
    })
}

function delete_cart(req,res){

}

module.exports={create,update,get_cart,delete_cart}