var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/:id', function(req, res) {
  if (req.params.id[0] == 'd'){
    axios.get('http://localhost:10000/docentes/'+req.params.id)
    .then(function(resposta){
      const docente = resposta.data
      if (docente != null){
        res.render('perfil', {isDocente : true, docente: docente});
      } 
      else{
        res.render('error', {message: 'Docente não registado na WhiteBoard'})
      }
    })
    .catch(function(){
      res.render('error', {message: 'Rota não existente na WhiteBoardAPI'})
    })
  }
  else if (req.params.id[0] == 'a'){
    axios.get('http://localhost:10000/alunos/'+req.params.id)
    .then(function(resposta){
      const aluno = resposta.data
      if (aluno != null){
        res.render('perfil', {isDocente : false, aluno: aluno});
      } 
      else{
        res.render('error', {message: 'Aluno não registado na WhiteBoard'})
      }
    })
    .catch(function(){
      res.render('error', {message: 'Rota não existente na WhiteBoardAPI'})
    })
  }
  else {
    res.render('error', {message: 'Formato de ID inválido'})
  }
});

module.exports = router;