var mysql = require('mysql')

const pool = mysql.createPool({
  // host: '142.93.212.142',
    host:'localhost',
    user: 'root',
    //password: '123',
   password:'',
    database: 'erp',
    port:'3306' ,
    connectionLimit:100,
    multipleStatements:true
  })


module.exports = pool;