//importing controllers
const {create,fetchAll,fetchOne,update,delete_category} = require("../controllers/category.controller")

//importing validators
const {category_name_validator}=require('../validators/category.validator');
let {verify_jwt,is_admin}=require('../validators/auth.validator');

//defining endpoints
module.exports = function(app){
    app.post("/categories",[verify_jwt,is_admin,category_name_validator], create);
    app.get("/categories", fetchAll);
    app.get("/categories/:id",fetchOne);
    app.put("/categories/:id",[verify_jwt,is_admin,category_name_validator],update);
    app.delete("/categories/:id",[verify_jwt,is_admin],delete_category);
}