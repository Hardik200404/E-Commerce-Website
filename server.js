//express is the library used for routing
const express=require('express');//this returns a function, using which app will be created
const {PORT}=require('./configs/server.config');
const body_parser=require('body-parser');//this is imported to parse the body of the req
const db=require('./models/index');
const app=express();

app.use(body_parser.json())

//routes are registered and the app is passed,to the respective route.js file
require('./routes/products.route')(app);
require('./routes/category.route')(app);

//.sync is helps to be in sync with the MySql while performing any ops
//if there no such table/db, this will create whatever is needed 
db.seq.sync()

//home page
app.get('/',function(req,res){
    res.writeHead(200)
    res.end("Home");
})
app.listen(PORT,()=>{
    console.log(`APP is running on port:${PORT}`);
})