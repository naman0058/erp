var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')
var upload = require('./multer');

var table = 'assignment';
router.get('/', (req, res) => {
    req.session.adminid ?
       res.render(`${table}/index`):
       res.render(`admin`);
    
 })
 

router.post('/insert',upload.single('assignment'), (req, res) => {
    let body = req.body;
    console.log(req.body)
    body['assignment'] = req.file.filename
    pool.query(`insert into ${table} set ?`, body, (err, result) => {
        if(err) throw err;
        else res.redirect('/assignment')
    })
})

router.get('/all',(req,res)=>{
    pool.query(`select a.*,(select d.name from department d where d.id=a.departmentid) as departmentname,
    (select y.name from year y where y.id=a.yearid) as year,
    (select b.name from batch b where b.id=a.batchid) as batch,
    (select s.name from subject s where s.id=a.subjectid) as subject from assignment a`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})

router.post('/update', (req, res) => {
    
    pool.query(`update ${table} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.get('/delete', (req, res) => {
    const { id } = req.query
    pool.query(`delete from ${table} where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})
// 

module.exports = router;
