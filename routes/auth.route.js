let auth_controller=require('../controllers/auth.controller');
let {user_validator,check_email_withDB,check_roles_withDB}=require('../validators/user.validator');
module.exports=function(app){
    app.post('/signup',[check_email_withDB,check_roles_withDB,user_validator],auth_controller.sign_up);
}
