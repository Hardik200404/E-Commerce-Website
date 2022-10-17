const {auth_service_obj}=require('../services/auth.service');

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

function sign_in(req,res) {
    auth_service_obj.sign_in(req.body.user_name,req.body.password)
    .then((authResponse) => {
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(authResponse));
    }).catch((error) => {
        console.log('Error Occurred while signing in', error);
        res.setHeader('content-type', 'application/json');
        res.writeHead(error.errorCode);
        res.end(JSON.stringify({
            message: error.message
        }));
    });
}

module.exports={sign_up,sign_in};