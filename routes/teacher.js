var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var pool = require('./pool')



router.get('/', (req, res) => {

    res.render(`teacher`);
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  pool.query(`select id,name from faculity where email = "${email}" and password = "${password}"`, (err, result) => {
      if (result[0]) {
          req.session.teacherid = result[0].id;
          res.render('/teacherhome');
      }
      else
          res.redirect('/teacher');
  })
})


router.get('/logout', (req, res) => {
  req.session.teacherid = null;
  res.redirect('/teacher');
})

module.exports = router;
















