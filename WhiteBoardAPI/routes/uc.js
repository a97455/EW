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

module.exports = router;