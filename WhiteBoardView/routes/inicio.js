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
    //! Ver se dá para restringir apenas a imagens e não outro tipo de ficheiros
    var d = new Date().toISOString().substring(0,16)
    res.render('registoAluno', {title: "Registo de um novo aluno", data: d});
})

router.get('/registoDocente', function(req, res) {
    //! Acrescentar palavra passe
    //! Ver se dá para restringir apenas a imagens e não outro tipo de ficheiros
    var d = new Date().toISOString().substring(0,16)
    res.render('registoDocente', {title: "Registo de um novo docente", data: d});
})

router.get('/paginaInicial/:id', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    if (req.params.id[0] == 'd'){
        axios.get('http://localhost:10000/ucs/docente/'+req.params.id)
            .then(function(resposta){
                res.render('paginaInicial', {title: "Página inicial", data: d, lista: resposta.data, aluno: false});
            })
            .catch(function(){
                res.render('error', {message: 'Não foi possível apresentar a página pretendida'})
            }) 
    }
    else if (req.params.id[0] == 'a'){
        axios.get('http://localhost:10000/ucs/aluno/'+req.params.id)
            .then(function(resposta){
                res.render('paginaInicial', {title: "Página inicial", data: d, lista: resposta.data, aluno: true});
            })
            .catch(function(){
                res.render('error', {message: 'Não foi possível apresentar a página pretendida'})
            })
        }
    else res.render('error', {message: 'Utilizador não encontrado'});
})


router.post('/', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    if (req.body.id[0] == 'd'){
        axios.post('http://localhost:10000/docentes/login/'+req.body.id)
            .then(function(r){
                axios.get('http://localhost:10000/ucs/docente/'+req.body.id)
                    .then(function(resposta){
                        res.render('paginaInicial', {title: "Página inicial", data: d, lista: resposta.data, aluno: false});
                    })
                    .catch(function(){
                        res.render('error', {message: 'Não foi possível apresentar a página pretendida'})
                    }) 
            })
            .catch(function(){
                res.render('error', {message: 'Não foi possível realizar o login: docente não encontrado'})
            })
    }
    else if (req.body.id[0] == 'a'){
        axios.post('http://localhost:10000/alunos/login/'+req.body.id)
            .then(function(r){
                axios.get('http://localhost:10000/ucs/aluno/'+req.body.id)
                    .then(function(resposta){
                        res.render('paginaInicial', {title: "Página inicial", data: d, lista: resposta.data, aluno: true});
                    })
                    .catch(function(){
                        res.render('error', {message: 'Não foi possível apresentar a página pretendida'})
                    })
            })
            .catch(function(){
                res.render('error', {message: 'Não foi possível realizar o login: Aluno não encontrado'})
            })
    }
    else res.render('error', {message: 'Não foi possível realizar o login'});
})


router.post('/registoAluno', function(req, res) {
    if (/a[0-9]+/.test(req.body._id)){
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
    console.log(JSON.stringify(req.body))
    if (/d[0-9]+/.test(req.body._id)){
        axios.post('http://localhost:10000/docentes/', req.body)
        .then(function(resposta){
            var d = new Date().toISOString().substring(0,16)
            res.render('login', {title: "Autenticação", data: d});
        })
        .catch(function(){
            res.render('error', {message: 'Não foi possível registar o novo docente'})
        })
    }
    else res.render('error', {message: 'Número de docente inválido'});
})
  

module.exports = router;