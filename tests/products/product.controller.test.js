const db=require('../../models/index');
const product_controller=require('../../controllers/products.controller');
const {mockRequest,mockResponse}=require('../interceptor');

const product_model=db.product;
let req,res;
describe('Test Product Controller Create call',()=>{
    beforeEach(()=>{
        req=mockRequest();
        res=mockResponse();
    })

    const requestTestPayload = {
        product_name: 'Samsung s22',
        description: 'Smart camera',
        price: 110000,
        category_id: 1
    }

    const responseTestPayload = {
        product_name: 'Samsung s22',
        description: 'Smart camera',
        price: 110000,
        category_id: 1,
        message: 'Product Created Successfully'
    }

    test('Should return success with product details',async()=>{
        let spy = jest.spyOn(product_model, 'create').mockImplementation(
            (payload) => new Promise(function(resolve, reject) {
                let obj = {};
                obj.dataValues = payload;
                resolve(obj);
            })
        );

        req.body = requestTestPayload;

        await product_controller.create(req, res);
        
        expect(spy).toHaveBeenCalled();
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(JSON.stringify(responseTestPayload));
    });
})