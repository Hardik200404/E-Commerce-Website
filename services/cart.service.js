let db=require('../models/index');

class cart_service{
    constructor(){
        this.schema=db.cart
    }

    create_cart(cart){
        return this.schema.create(cart);
    }

    get_cart_byId(id){
        return this.schema.findByPk(id)
    }

    update_cart(cart,id){
        return this.schema.update(cart,{
            returning:true,
            where:{
                id:id
            }
        })
    }
}

let cart_service_obj=new cart_service();
module.exports={cart_service_obj}