let {category_model}=require('../models/category.model.js');

class category_service{
    schema;
    constructor(){
        this.schema=category_model
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
}

let category_service_obj=new category_service();
module.exports={category_service_obj};