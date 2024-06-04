var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    res.render('login', {title: "Autenticação", data: d});
})

router.get('/registoAluno', function(req, res) {
    res.render('registoAluno', {title: "Registo de um novo aluno"});
})

router.get('/registoDocente', function(req, res) {
    res.render('registoDocente', {title: "Registo de um novo docente"});
})

router.get('/paginaInicial/:id', function(req, res) {
    res.render('paginaInicial', {title: "Página inicial"});
})


router.post('/', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    if (req.body.id[0] == 'd'){
        axios.post('http://localhost:10000/docentes/login/'+req.body.id)
        .then(function(resposta){
            res.render('paginaInicial', {title: "Página inicial", user: resposta.data, data: d})
        })
        .catch(function(){
            res.render('error', {message: 'Não foi possível realizar o login: docente não encontrado'})
        })
    }
    else if (req.body.id[0] == 'a'){
        axios.post('http://localhost:10000/alunos/login/'+req.body.id)
        .then(function(resposta){
            res.render('paginaInicial', {title: "Página inicial", user: resposta.data, data: d})
        })
        .catch(function(){
            res.render('error', {message: 'Não foi possível realizar o login: Aluno não encontrado'})
        })
    }
    else res.render('error', {message: 'Não foi possível realizar o login:'});
})
  

module.exports = router;