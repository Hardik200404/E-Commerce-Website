const {user_servie_obj} = require("../services/user.service");
const {role_serive_obj}=require('../services/role.serive');
let {jwt_service_obj}=require('../services/jwt.service')

//check request user body in signUp
function singUp_validator(req,res,next){
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

//check request user body in signIn
function signIn_validator(req,res,next){
    let user={
        user_name:req.body.user_name,
        password:req.body.password
    }
    if(user.user_name && user.password){
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
function check_email_withDB(req,res,next){
    if(req.body.email){
        user_servie_obj.get_user_byEmail(req.body.email)
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

//check roles
function check_roles_withDB(req,res,next){
    if(req.body.roles) {
        role_serive_obj.get_role_byName(req.body.roles)
        .then((roles) => {
            let presentRoles = roles.map((role) => {
                return role.dataValues
            });
            let presentRoleObj = {};
            for(let role of presentRoles) {
                let role_name = role.role_name;
                presentRoleObj[role_name] = 1;
            }

            let requestedRoles = req.body.roles;
            let flag=true
            for(i of requestedRoles){
                if(!presentRoleObj[i]) {
                    flag=false;
                    res.setHeader('content-type', 'application/json');
                    res.writeHead(404);
                    res.end(JSON.stringify({
                        message: `role with name ${i} is not present`
                    }));
                    break;
                }
            }
            if(flag){
                next();
            }
        });
    }else{
        next();
    }
}

function verify_jwt(req,res,next){
    try{
        let decoded=jwt_service_obj.verify_jwt_token(req.rawHeaders[1])
        if(decoded.validated){
            req.decoded_jwt = decoded.decoded_jwt;
            next();
        }
    }catch(err){
        res.setHeader('content-type', 'application/json');
        res.writeHead(401);
        res.end(JSON.stringify({
            message: err.message
        }));
    }
}

function is_admin(req,res,next){
    if(req.decoded_jwt.roles.indexOf('admin')!=-1){
        next();
    }else{
        res.setHeader('content-type', 'application/json');
        res.writeHead(403);
        res.end(JSON.stringify({
            message: 'Not Authorised'
        }));
    }
    
}

module.exports={singUp_validator,
    check_email_withDB,
    check_roles_withDB,
    signIn_validator,
    verify_jwt,
    is_admin
}