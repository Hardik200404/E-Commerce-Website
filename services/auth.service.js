let {user_servie_obj}=require('./user.service');
let {role_serive_obj}=require('./role.serive');
let {jwt_service_obj}=require('./jwt.service');
let bcrypt=require('bcrypt');

class auth_service{
    sign_up(user,roles){
        //before creating user, hashing password, and replacing it in the user obj
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
            return Promise.reject('Error while Signing Up')
        })
    }

    sign_in(user_name, password){
        return user_servie_obj.get_user_byName(user_name)
        .then((user)=>{
            if(user){
                let isPasswordValid=bcrypt.compareSync(password, user.password);
                if(!isPasswordValid){
                    return Promise.reject({
                        errorCode:401,
                        message:'Wrong Password'
                    });
                }

                return user.getRoles()
                .then((roles)=>{
                    //getting roles of that user,and adding this information to 
                    //jwt token
                    let roleNames=roles.map((role)=>{
                        return role.role_name;
                    });

                    let payload={id:user.id, roles:roleNames};
                    let token=jwt_service_obj.create_jwt_token(payload);
                    
                    return{
                        message:'Logged In Successfully',
                        accessToken: token
                    }
                });

            }else{
                return Promise.reject({
                    errorCode: 404, 
                    message: 'User Not Found'
                });
            }
        })
    }

}

let auth_service_obj=new auth_service();
module.exports={auth_service_obj};