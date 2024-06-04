var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    res.render('login', {title: "Autenticação", data: d});
})

router.get('/registoAluno', function(req, res) {
    //! Alterar escolha de curso para opções em vez de texto
    //! Acrescentar palavra passe
    var d = new Date().toISOString().substring(0,16)
    res.render('registoAluno', {title: "Registo de um novo aluno", data: d});
})

router.get('/registoDocente', function(req, res) {
    //! Acrescentar palavra passe
    var d = new Date().toISOString().substring(0,16)
    res.render('registoDocente', {title: "Registo de um novo docente", data: d});
})

router.get('/paginaInicial/:id', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    res.render('paginaInicial', {title: "Página inicial", data: d});
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


router.post('/registoAluno', function(req, res) {
    if (/a[0-9]+/.test(req.body.id)){
        axios.post('http://localhost:10000/alunos/', req.body)
        .then(function(resposta){
            var d = new Date().toISOString().substring(0,16)
            res.render('login', {title: "Autenticação", data: d});
        })
        .catch(function(){
            res.render('error', {message: 'Não foi possível registar o novo aluno'})
        })
    }
    else res.render('error', {message: 'Número de aluno inválido'});
})
  

router.post('/registoDocente', function(req, res) {
    if (/d[0-9]+/.test(req.body.id)){
        axios.post('http://localhost:10000/docentes/', req.body)
        .then(function(resposta){
            var d = new Date().toISOString().substring(0,16)
            res.render('login', {title: "Autenticação", data: d});
        })
        .catch(function(){
            res.render('error', {message: 'Não foi possível registar o novo aluno'})
        })
    }
    else res.render('error', {message: 'Número de aluno inválido'});
})
  

module.exports = router;