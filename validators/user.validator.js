const {user_servie_obj} = require("../services/user.service");
const {role_serive_obj}=require('../services/role.serive');
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
            requestedRoles.forEach((requestedRole) => {
                if(!presentRoleObj[requestedRole]) {
                    res.setHeader('content-type', 'application/json');
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        message: `role with name ${requestedRole} is not present`
                    }));
                }
            });
            next();
        });
    }else{
        next();
    }
}
module.exports={user_validator,check_email_withDB,check_roles_withDB}