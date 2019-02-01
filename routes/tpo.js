var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')
var upload = require('./multer');
var fs = require('fs');

var Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'e14f55a0',
  apiSecret: 'qtHyZuDn1VieWvB6'
},{debug:true})



var table="tpo";
router.get('/', (req, res) => {
      var query = `select * from department;`
      pool.query(query,(err,result)=>{
            if(err) throw err;
            else
       res.render(`${table}/index`,{result:result})
      })
    
 })

 router.get('/single',(req,res)=>{
      const {id,percentage}=req.query
      console.log(req.query)
     var query = `select * from student where ssc>=${percentage} and hsc>=${percentage} and departmentid=${id} and yearid='4';`
      pool.query(query,(err,result)=>{
            if(err) throw err;
            else res.json(result);
      })
})



router.get('/sendmessage',(req,res)=>{
      const {mobile_number,msg} = req.query
      console.log(req.query)
      var dirt = false
      var a = mobile_number.join("-")
      //console.log("conversion",a)
      
      var b = a.split("-")
      for(i=0;i<=3;i++){
      //console.log(b[i]);
           
          nexmo.message.sendSms(
                  'NEXMO',  b[i], msg, {type:'unicode'},(err,res)=>{
                    if (err) {
                      console.log(err);
                    } else {
                      console.dir(res);
                    }
                
                    
                  }
                
                )
                
            }
      
    /*  var dirt = true
      fs.readFile("http://mysms.vertoindia.com/api/sendmsg.php?user=sssir&pass=numeric@123&sender=SAPPAL&phone="+a+"&priority=ndnd&stype=normal");
  */res.send('suceessfully');
      
})


module.exports = router;