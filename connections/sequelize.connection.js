let {Sequelize}=require('sequelize');
let db_config=require('../configs/db.config.js');
function connectdb(){
    let seq=new Sequelize(db_config.NAME,db_config.USER,db_config.PASSWORD,{
        host:db_config.HOST,
        port:3306,
        dialect:db_config.dialect,
        define:{
            timestamps:false
        },
        pool:db_config.pool
        //defining timestamp false will avoid adding created and updated at by default
    });

    seq.authenticate().then(()=>{
        console.log("Successfully Connected");
    }).catch((err)=>{
        console.log("Error Connecting",err);
    })
    return {seq}
}
let {seq}=connectdb();
function execute_with_sync(promiseCallBack){
    seq.sync().then(()=>promiseCallBack);
}
module.exports={seq,execute_with_sync};