let {create,fetchAll,fetchOne,update,delete_product} =require('../controllers/products.controller');
let {product_validator}=require('../validators/product.validator');
module.exports=function(app){
    app.get('/products',fetchAll);
    app.post('/products',[product_validator],create);
    app.get('/products/:id',fetchOne);
    app.put('/products/:id',[product_validator],update);
    app.delete('/products/:id',delete_product);
}
