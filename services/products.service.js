let {category_model}=require('../models/category.model.js');
let {product_model}=require('../models/products.model.js');

class product_service{
    schema;
    constructor(){
        this.schema=product_model
    }
    get_products_all(){
        return this.schema.findAll({
            include:[{
                required:true,
                model:category_model
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
                model:category_model
            }]
        });
    }
    create_product(product){
        return this.schema.create(product);
    }
}

let product_service_obj=new product_service();
module.exports={product_service_obj};