const {create,fetchAll,fetchOne,update,delete_category} = require("../controllers/category.controller")

module.exports = function(app){
    app.post("/categories", create);
    app.get("/categories", fetchAll);
    app.get("/categories/:id",fetchOne);
    app.put("/categories/:id",update);
    app.delete("/categories/:id", delete_category);
}