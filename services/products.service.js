let db=require('../models/index');
class product_service{
    schema;
    constructor(){
        this.schema=db.product
    }
    get_products_all(query){
        query=this.#define_filters(query)
        return this.schema.findAll({
            where:query.product,
            include:[{
                required:true,
                model:db.category,
                where:query.category
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

    #define_filters(query){
        let obj={};
        if(query.categoryName){
            obj['category']={
                'category_name':query.categoryName
            };
        }
        if(query.maxPrice && query.minPrice){
            obj['product']={
                'price':{
                    [db.Sequelize.Op.lte]:Number(query.maxPrice),
                    [db.Sequelize.Op.gte]:Number(query.minPrice)
                }
            }
        }
        else if(query.maxPrice){
            obj['product']={
                'price':{
                    [db.Sequelize.Op.lte]:Number(query.maxPrice)
                }
            }
        }
        else if(query.minPrice){
            obj['product']={
                'price':{
                    [db.Sequelize.Op.gte]:Number(query.minPrice)
                }
            }
        }
        return obj
    }
}

let product_service_obj=new product_service();
module.exports={product_service_obj};