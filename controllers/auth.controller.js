let {auth_service_obj}=require('../services/auth.service');

function sign_up(req,res){
    let user={
        user_name:req.body.user_name,
        email:req.body.email,
        password:req.body.password
    }
    let roles=req.body.roles
    auth_service_obj.sign_up(user,roles)
    .then(()=>{
        res.setHeader('content-type','application/json');
        res.writeHead(201);
        res.end(JSON.stringify({
            "message":"User Registered Successfully"
        }))
    })
    .catch((err)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        console.log("Error ",err);
        res.end(JSON.stringify({
            "message":err.message
        }))
    })
}

module.exports={sign_up};