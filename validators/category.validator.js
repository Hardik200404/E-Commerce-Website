function category_name_validator(req,res,next){
    if(req.body.category_name){
        next();
    }
    else{
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    }
}

module.exports={category_name_validator}