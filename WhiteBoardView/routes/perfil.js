var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('perfil', { title: 'Express' });
});

module.exports = router;