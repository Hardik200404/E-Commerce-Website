//importing controllers
let roles_controller=require('../controllers/roles.controller');

//importing validators
let {verify_jwt,is_admin}=require('../validators/auth.validator');

module.exports=function(app){
    app.post('/roles',[verify_jwt,is_admin],roles_controller.create_role);
    app.get('/roles',[verify_jwt,is_admin],roles_controller.fetchAll);
}