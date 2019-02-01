/*var express = require('express');
var router = express.Router();
var mysql = require('mysql')



const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notes',
  connectionLimit:100,
  multipleStatements:true
})



/* GET home page. */
/*
router.get('/', (req, res) => {
   var query1 = `select * from class;`
   var query2 = `select s.* ,(select c.name from class c where c.id=s.classid) as classname , 
                (select b.name from board b where b.id = s.boardid) as boardname from subject s 
                 where s.classid='22';`
   var query3 =`select a.* ,(select c.name from class c where c.id=a.classid) as classname,
                (select b.name from board b where b.id=a.boardid) as boardname,
                (select s.name from subject s where s.id=a.subjectid) as subjectname from answer 
                 a where a.subjectid='6'; `
   var query4 =`select s.* ,(select c.name from class c where c.id=s.classid) as classname , 
   (select b.name from board b where b.id = s.boardid) as boardname from subject s 
    where s.classid='24';`             
   //pool.query(query1+query2+query3,(err,result)=>{
    pool.query(query1+query2+query3+query4,(err,result)=>{

  if(err) throw err
  else
  {
    
    res.render(`index`,{result:result})
    //res.render(`index`)
 // }
  
//})
  }
})
})
module.exports = router;*/
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')



router.get('/', (req, res) => {
    if(req.session.id) {
      res.render(`index`, { login: true });
    }
    else {
      res.render(`index`, { login: false });
    }
})

module.exports = router;