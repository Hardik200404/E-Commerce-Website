//express is the library used for routing
const express=require('express');
const {PORT}=require('./configs/server.config');
const body_parser=require('body-parser');//this is imported to parse the body of the req
const db=require('./models/index');
const app=express();

app.use(body_parser.json())

require('./routes/products.route')(app);
require('./routes/category.route')(app);

db.seq.sync()

app.get('/',function(req,res){
    res.writeHead(200)
    res.end("Home");
})
app.listen(PORT,()=>{
    console.log(`APP is running on port:${PORT}`);
})