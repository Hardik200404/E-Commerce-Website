const {create,fetchAll,fetchOne,update,delete_category} = require("../controllers/category.controller")
const {category_name_validator}=require('../validators/category.validator');

//all the endpoints and methods are mentioned here, 
//with the corresponding controllers and required validators
module.exports = function(app){
    app.post("/categories",[category_name_validator], create);
    app.get("/categories", fetchAll);
    app.get("/categories/:id",fetchOne);
    app.put("/categories/:id",[category_name_validator],update);
    app.delete("/categories/:id", delete_category);
}