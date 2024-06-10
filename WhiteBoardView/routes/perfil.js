var express = require('express');
var router = express.Router();
var axios = require('axios')

const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const FormData = require('form-data');
const fs = require('fs');


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

router.get('/:id/notas', function(req, res){
  axios.get('http://localhost:10000/alunos/'+req.params.id+"/notas")
    .then(function(resposta){
      const notas = resposta.data
      res.render('alunoVerNotas', {notasAlunos: notas, alunoID: req.params.id})
    })
    .catch(function(){
      res.render('error', {message: 'Rota não existente na WhiteBoardAPI'})
    })
  
});

router.get('/:id/inscreverUC', function(req, res) {
  if (req.params.id[0] == 'd' || req.params.id[0] == 'a'){
    res.render('inscreverUC', {userID: req.params.id})
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
      res.render('error', {message: 'ID de UC não existente'})
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
      res.render('error', {message: 'ID de UC não existente'})
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

router.post('/:id/editar', upload.single('foto'), function(req, res) {
  // Cria um form para enviar para o WhiteBoardAPI (body e file)
  const form = new FormData();
    
  for (const key in req.body) {
    form.append(key, req.body[key]);
  }
  
  if (req.file) {
    form.append('foto', fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
  }

  if (req.params.id[0] == 'd'){
    axios.put('http://localhost:10000/docentes/'+req.body._id, form, {headers: {...form.getHeaders()}})
    .then(function(resposta){
      const docente = resposta.data
      if (docente != null){
        res.redirect("/perfil/"+req.body._id)
      } 
      else{
        res.render('error', {message: 'Docente não registado na WhiteBoard'})
      }

      fs.unlink(req.file.path, function(error) {
        if (error) console.error('Erro ao eliminar o ficheiro temporario', error);
      });
    })
    .catch(function(){
      res.render('error', {message: 'Rota não existente na WhiteBoardAPI'})
    })
  }
  else if (req.params.id[0] == 'a'){
    axios.put('http://localhost:10000/alunos/'+req.body._id, form, {headers: {...form.getHeaders()}})
    .then(function(resposta){
      const aluno = resposta.data
      if (aluno != null){
        res.redirect("/perfil/"+req.body._id)
      } 
      else{
        res.render('error', {message: 'Aluno não registado na WhiteBoard'})
      }

      fs.unlink(req.file.path, function(error) {
        if (error) console.error('Erro ao eliminar o ficheiro temporario', error);
      });
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