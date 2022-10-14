let roles_controller=require('../controllers/roles.controller');
module.exports=function(app){
    app.post('/roles',roles_controller.create_role);
    app.get('/roles',roles_controller.fetchAll);
}
