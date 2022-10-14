let db=require('../models/index');
class role_serive{
    constructor(){
        this.schema=db.role;
    }
    get_role_byName(role_name){
        return this.schema.findAll({
            where:{
                role_name:{
                    [db.Sequelize.Op.or]:role_name
                }
            }
        }).catch((err)=>{
            console.log('error in fetching roles',err);
            return Promise.reject('error while fetching roles');
        });
    }
    create_role(role_name){
        return this.schema.create(role_name);
    }
    get_roles_all(){
        return this.schema.findAll();
    }
}

let role_serive_obj=new role_serive();
module.exports={role_serive_obj};