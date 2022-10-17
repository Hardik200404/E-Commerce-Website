let auth_controller=require('../controllers/auth.controller');
let {singUp_validator,
    check_email_withDB,
    check_roles_withDB,
    signIn_validator}=require('../validators/auth.validator');
module.exports=function(app){
    app.post('/signup',[singUp_validator,check_email_withDB,check_roles_withDB],auth_controller.sign_up);
    app.post('/signin',[signIn_validator],auth_controller.sign_in);
}
