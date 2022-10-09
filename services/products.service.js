let db=require('../models/index');
class product_service{
    schema;
    constructor(){
        this.schema=db.product
    }
    get_products_all(){
        return this.schema.findAll({
            include:[{
                required:true,
                model:db.category
            }]
            //include will include the respective record of category, while fetching products
        });
    }
    get_product_byId(id){
        return this.schema.findOne({
            where:{
                id:id
            },
            include:[{
                required:true,
                model:db.category
            }]
        });
    }
    create_product(product){
        return this.schema.create(product);
    }
    update_product_byId(updated_product,id){
        //return true will give back the updated
        return this.schema.update(updated_product,{
            returning:true,
            where:{
                id:id
            }
        })
    }
    delete_product_byId(id){
        return this.schema.destroy({
            where:{
                id:id
            }
        })
    }
}

let product_service_obj=new product_service();
module.exports={product_service_obj};