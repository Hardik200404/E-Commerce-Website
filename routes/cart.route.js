//importing controllers
let cart_controller=require('../controllers/cart.controller');

//importing validators
let {verify_jwt}=require('../validators/auth.validator');
let {products_ids_validator}=require('../validators/product.validator')

//defining endpoints
module.exports=function(app){
    app.post('/cart',verify_jwt,cart_controller.create)
    app.get('/cart/:id',verify_jwt,cart_controller.get_cart)
    app.delete('/cart/:id',verify_jwt,cart_controller.delete_cart)
    app.put('/cart/:id',[verify_jwt,products_ids_validator],cart_controller.update)
}