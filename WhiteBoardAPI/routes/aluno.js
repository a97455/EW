var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno')

router.get('/:id', function(req, res) {
    Aluno.findById(req.params.id)
    .then(function(data){
      res.jsonp(data)
    })
    .catch(function(erro){
      res.jsonp(erro)
    })
});

module.exports = router;