let {user_servie_obj}=require('./user.service');
let {role_serive_obj}=require('./role.serive');
let bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

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

    sign_in(user_name, password) {
        return user_servie_obj.get_user_byName(user_name)
        .then((user) => {
            if(user) {
                let isPasswordValid = bcrypt.compareSync(password, user.password);
                if(!isPasswordValid) {
                    return Promise.reject({
                        errorCode: 401,
                        message: 'Wrong Password'
                    });
                }

                return user.getRoles()
                .then((roles) => {
                    //getting roles of that user,and adding this information to 
                    //jwt token
                    let roleNames = roles.map((role) => {
                        return role.role_name;
                    });

                    let token = jwt.sign({ id: user.id, roles: roleNames },
                        authConfig.SECRET, {
                            expiresIn: authConfig.EXPIRY_TIME
                        });
                    
                    return {
                        message:'Logged In Successfully',
                        accessToken: token
                    }
                });

            } else {
                return Promise.reject(
                    {
                        errorCode: 404, 
                        message: 'User Not Found'
                    });
            }
        })
    }

}

let auth_service_obj=new auth_service();
module.exports={auth_service_obj};