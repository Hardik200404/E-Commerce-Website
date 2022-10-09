let db=require('../models/index');
class category_service{
    schema;
    constructor(){
        this.schema=db.category
    }
    get_categories_all(){
        return this.schema.findAll();
    }
    get_categories_byId(id){
        return this.schema.findOne({
            where:{
                id:id
            }
        });
    }
    create_category(category){
        return this.schema.create(category);
    }
    update_category_byId(updated_category,id){
        //return true will give back the updated
        return this.schema.update(updated_category,{
            returning:true,
            where:{
                id:id
            }
        })
    }
    delete_category_byId(id){
        return this.schema.destroy({
            where:{
                id:id
            }
        })
    }
}

let category_service_obj=new category_service();
module.exports={category_service_obj};