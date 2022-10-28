let {role_serive_obj}=require('../services/role.serive');

function create_role(req,res){
    role_serive_obj.create_role(req.body)
    .then(()=>{
        res.setHeader('content-type','application/json');
        res.writeHead(201);
        res.end(JSON.stringify({
            "message":"Role Created Successfully"
        }))
    })
    .catch((err)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        console.log("Error ",err);
        res.end(JSON.stringify({
            "message":"Error Creating Role"
        }))
    })
}

function fetchAll(req,res){
    role_serive_obj.get_roles_all()
    .then((results)=>(results.map((data)=>data.dataValues)))
    .then((data)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify(data));
    })
    .catch((err)=>{
        res.setHeader('content-type','application/json');
        res.writeHead(500);
        console.log("Error ",err);
        res.end(JSON.stringify({
            "message":"Error fetching Roles"
        }))
    })
}

module.exports={create_role,fetchAll};