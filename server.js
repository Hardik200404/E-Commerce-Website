//express is the library used for routing
const express=require('express');
const {PORT}=require('./configs/server.config');
const {category_router}=require('./controllers/category.controller');

const app=express();
app.use('/category',category_router);//registering endpoint to the controller
//now category_router will act as app of express in controller file

const body_parser=require('body-parser');
app.use(body_parser.json());


app.get('/',function(req,res){
    res.writeHead(200)
    res.end();
})
app.listen(PORT,()=>{
    console.log(`APP is running on port:${PORT}`);
})