var express = require('express');
var router = express.Router();
var Docente = require('../controllers/docente')

router.get('/:id', function(req, res) {
    Docente.findById(req.params.id)
    .then(function(data){
      res.jsonp(data)
    })
    .catch(function(erro){
      res.jsonp(erro)
    })
});

router.post('/', function(req, res) {
    Docente.insert(req.body)
    .then(function(data){
      res.jsonp(data)
    })
    .catch(function(erro){
      res.jsonp(erro)
    })
});

router.put('/:id', function(req, res) {
    Docente.update(req.params.id, req.body)
    .then(function(data){
        res.jsonp(data)
    })
    .catch(function(erro){
        res.jsonp(erro)
    })
});

router.delete('/:id', function(req, res) {
    Docente.delete(req.params.id)
    .then(function(data){
        res.jsonp(data)
    })
    .catch(function(erro){
        res.jsonp(erro)
    })
});
  

module.exports = router;