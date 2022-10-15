let db=require('../models/index');
class user_servie{
    constructor(){
        this.schema=db.user;
    }
    create_user(user){
        return this.schema.create(user)
        .catch((err)=>{
            console.log('error creating user',err);
            return Promise.reject('error creating user')
        })
    }
    get_user_byEmail(email){
        return this.schema.findOne({
            where:{
                email:email.toLowerCase()
            }
        })
    }
    get_user_byName(user_name){
        return this.schema.findOne({
            where:{
                user_name:user_name
            }
        })
    }
}

let user_servie_obj=new user_servie();
module.exports={user_servie_obj};