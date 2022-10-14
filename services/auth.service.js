let {user_servie_obj}=require('./user.service');
let {role_serive_obj}=require('./role.serive');
let bcrypt=require('bcrypt');
class auth_service{
    sign_up(user,roles){
        //before creating user, hash the password
        user.password=bcrypt.hashSync(user.password,8);
        return user_servie_obj.create_user(user)
        .then((user)=>{
            if(roles){
                //if roles are given,first get those roles and set them on corresponding user
                role_serive_obj.get_role_byName(roles)
                .then((roles)=>{
                    user.setRoles(roles);
                })
            }else{
                //if roles not provided, set it to role user(id:1)
                user.setRoles([1]);
            }
        }).catch((err)=>{
            //if any serivce call return error
            console.log('error registering user',err)
            return Promise.reject('error while Signing Up')
        })
    }
}

let auth_service_obj=new auth_service();
module.exports={auth_service_obj};