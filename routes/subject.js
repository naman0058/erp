var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')
var upload = require('./multer');
var table="subject";

router.get('/', (req, res) => {
    
       res.render(`${table}/index`)
    
    
 })
 
 router.post('/insert', (req, res) => {
    pool.query(`insert into ${table} set ?`, req.body, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.get('/all',(req,res)=>{
    pool.query(`select s.*,(select y.name from year y where y.id=s.yearid) as year,
    (select b.name from batch b where b.id=s.batchid) as batch,
    (select d.name from department d where d.id=s.departmentid) as departmentname from subject s`,(err,result)=>{
     if(err) throw err;
        else res.json(result);
    })
})

router.post('/update', (req, res) => {
    console.log(req.body)
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


module.exports = router;
