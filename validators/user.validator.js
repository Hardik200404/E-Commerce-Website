const { user_servie_obj } = require("../services/user.service");

//check request user body 
function user_validator(req,res,next){
    let user={
        user_name:req.body.user_name,
        email:req.body.email,
        password:req.body.password,
    }
    if(user.user_name && user.email && user.password){
        next();
    }else{
        res.setHeader('content-type','application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            "message":"Bad Content"
        }))
    }
}

//check email
function check_email_inDB(req,res,next){
    let email=req.body.email
    if(email){
        user_servie_obj.get_user_byEmail(email)
        .then((data)=>{
            if(data){
                //duplicate email corner case
                res.setHeader('content-type','application/json');
                res.writeHead(400);
                res.end(JSON.stringify({
                    "message":"Email Already In Use"
                }))
            }else{
                //incase email doesn't exist
                next();
            }
        })
    }
}
module.exports={user_validator,check_email_inDB}