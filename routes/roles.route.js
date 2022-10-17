let roles_controller=require('../controllers/roles.controller');
let {verify_jwt,is_admin}=require('../validators/auth.validator');

module.exports=function(app){
    app.post('/roles',[verify_jwt,is_admin],roles_controller.create_role);
    app.get('/roles',[verify_jwt],roles_controller.fetchAll);
}
//inorder to get all the roles, user must be logged in 
//inorder create role, user must be admin