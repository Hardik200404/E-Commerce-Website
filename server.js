//express is the library used for routing
const express=require('express');
const {PORT}=require('./configs/server.config');
const {category_router}=require('./controllers/category.controller');
const {products_router}=require('./controllers/products.controller');

const app=express();

const body_parser=require('body-parser');//this is imported to parse the body of the req
app.use(body_parser.json())

app.use('/categories',category_router);//registering endpoint to the controller
//now category_router will act as app of express in controller file
app.use('/products',products_router);


app.get('/',function(req,res){
    res.writeHead(200)
    res.end("Home");
})
app.listen(PORT,()=>{
    console.log(`APP is running on port:${PORT}`);
})