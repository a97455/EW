var express = require('express');
var router = express.Router();
var UC = require('../controllers/uc')

router.post('/', function(req, res) {
  UC.insert(req.body)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});

router.get('/:id', function(req, res) {
  UC.findById(req.params.id)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});

router.put('/:id', function(req, res) {
  UC.update(req.params.id, req.body)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});

router.delete('/:id', function(req, res) {
  UC.delete(req.params.id)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});


router.get('/aluno/:id', function(req, res) {
  UC.ucsAluno(req.params.id)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});

router.get('/docente/:id', function(req, res) {
  UC.ucsDocente(req.params.id)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});

router.put('/addDocente/:idUC/:idDocente', function(req, res) {
  UC.addDocente(req.params.idUC, req.body.codUC, req.params.idDocente)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});

router.put('/addAluno/:idUC/:idAluno', function(req, res) {
  UC.addAluno(req.params.idUC, req.body.codUC ,req.params.idAluno)
  .then(function(data){
    res.jsonp(data)
  })
  .catch(function(erro){
    res.jsonp(erro)
  })
});

module.exports = router;