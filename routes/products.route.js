let {create,fetchAll,fetchOne,update,delete_product} =require('../controllers/products.controller');
let {product_validator}=require('../validators/product.validator');
let {verify_jwt,is_admin}=require('../validators/auth.validator');
//all the endpoints and methods are mentioned here, 
//with the corresponding controllers and required validators
module.exports=function(app){
    app.get('/products',fetchAll);
    app.post('/products',[verify_jwt,is_admin,product_validator],create);
    app.get('/products/:id',fetchOne);
    app.put('/products/:id',[verify_jwt,is_admin,product_validator],update);
    app.delete('/products/:id',[verify_jwt,is_admin],delete_product);
}
