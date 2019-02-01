var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')
var upload = require('./multer');
var table="year";
 

router.get('/all',(req,res)=>{
    pool.query(`select * from ${table}`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



module.exports = router;
