var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')



router.get('/', (req, res) => {
    if(req.session.teacherid)
    {
        var query1 = `SELECT count(id) as total_student from student where departmentid='1';`
        var query2 = `SELECT count(id) as total_student from student where departmentid='4';`
        var query3 = `SELECT count(id) as total_student from student where departmentid='5';`
        var query4 = `SELECT count(id) as total_student from student where departmentid='6';`
        var query5 = `SELECT s.*,(select d.name from department d where d.id=s.id ) as department_name from student s where s.departmentid='1';`
        var query6 = `SELECT s.*,(select d.name from department d where d.id=s.id ) as department_name from student s where s.departmentid='4';`
        var query7 = `SELECT s.*,(select d.name from department d where d.id=s.id ) as department_name from student s where s.departmentid='5';`
        var query8 = `SELECT s.*,(select d.name from department d where d.id=s.id ) as department_name from student s where s.departmentid='6';`
       // var query1 = `select * from student;`
        //var query2 = `select * from faculity;`
        pool.query(query1+query2+query3+query4+query5+query6+query7+query8,(err,result)=>{

            if(err){ throw err}
            else
            res.render(`teacherhome`,{result:result}) 
        })
    }
    else
       res.render(`admin`);
    
 })

 
module.exports = router;
