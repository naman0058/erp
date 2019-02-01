var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')



router.get('/', (req, res) => {

    res.render(`admin`);
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  pool.query(`select * from admin where email = "${email}" and password = "${password}"`, (err, result) => {
      if (result[0]) {
          req.session.adminid = result[0].id;
          res.redirect('/adminhome');
      }
      else
          res.redirect('/admin');
  })
})


router.get('/logout', (req, res) => {
  req.session.adminid = null;
  res.redirect('/admin');
})

module.exports = router;
















