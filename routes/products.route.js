let {create,fetchAll,fetchOne,update,delete_product} =require('../controllers/products.controller');
module.exports=function(app){
    app.get('/products',fetchAll);
    app.post('/products',create);
    app.get('/products/:id',fetchOne);
    app.put('/products/:id',update);
    app.delete('/products/:id',delete_product);
}
