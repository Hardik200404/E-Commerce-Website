let auth_controller=require('../controllers/auth.controller');
let {user_validator,check_email_withDB,check_roles_withDB}=require('../validators/auth.validator');
module.exports=function(app){
    app.post('/signup',[user_validator,check_email_withDB,check_roles_withDB],auth_controller.sign_up);
    app.post('/signin',auth_controller.sign_in);
}
