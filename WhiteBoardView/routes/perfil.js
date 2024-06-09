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

router.get('/:id/verNotas', function(req, res){
  axios.get('http://localhost:10000/alunos/'+req.params.id+"/notas")
    .then(function(resposta){
      const notas = resposta.data
      res.render('alunoVerNotas', {notasAlunos: notas})
    })
    .catch(function(){
      res.render('error', {message: 'Rota não existente na WhiteBoardAPI'})
    })
  
});

router.get('/:id/inscreverUC', function(req, res) {
  if (req.params.id[0] == 'd' || req.params.id[0] == 'a'){
    res.render('inscreverUC', {})
  }
  else {
    res.render('error', {message: 'Formato de ID inválido'})
  }
});

router.post('/:id/inscreverUC', function(req, res) {
  if (req.params.id[0] == 'd'){
    axios.put('http://localhost:10000/ucs/addDocente/'+req.body._id+"/"+req.params.id, req.body)
    .then(function(resposta){
      if (resposta.data.modifiedCount == 1){
        res.redirect("/perfil/"+req.params.id)
      } 
      else{
        res.render('error', {message: 'Inscrição na UC inválida'})
      }
    })
    .catch(function(){
      res.render('error', {message: 'Rota não existente na WhiteBoardAPI'})
    })
  }
  else if (req.params.id[0] == 'a'){
    axios.put('http://localhost:10000/ucs/addAluno/'+req.body._id+"/"+req.params.id, req.body)
    .then(function(resposta){
      if (resposta.data.modifiedCount == 1){
        res.redirect("/perfil/"+req.params.id)
      } 
      else{
        res.render('error', {message: 'Inscrição na UC inválida'})
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

router.get('/:id/editar', function(req, res) {
  if (req.params.id[0] == 'd'){
    axios.get('http://localhost:10000/docentes/'+req.params.id)
    .then(function(resposta){
      const docente = resposta.data
      if (docente != null){
        res.render('editarPerfil', {isDocente : true, docente: docente});
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
        res.render('editarPerfil', {isDocente : false, aluno: aluno});
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

router.post('/:id/editar', function(req, res) {
  if (req.params.id[0] == 'd'){
    axios.put('http://localhost:10000/docentes/'+req.body._id, req.body)
    .then(function(resposta){
      const docente = resposta.data
      if (docente != null){
        res.redirect("/perfil/"+req.body._id)
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
    axios.put('http://localhost:10000/alunos/'+req.body._id, req.body)
    .then(function(resposta){
      const aluno = resposta.data
      if (aluno != null){
        res.redirect("/perfil/"+req.body._id)
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