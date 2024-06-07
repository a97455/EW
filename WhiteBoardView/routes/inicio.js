var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    res.render('login', {title: "Autenticação"});
})

router.get('/paginaInicial/:id', function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    if (req.params.id[0] == 'd'){
        axios.get('http://localhost:10000/ucs/docente/'+req.params.id)
            .then(function(resposta){
                res.render('paginaInicial', {title: "Página inicial", user: req.params.id, lista: resposta.data, aluno: false});
            })
            .catch(function(){
                res.render('error', {message: 'Não foi possível apresentar a página pretendida'})
            }) 
    }
    else if (req.params.id[0] == 'a'){
        axios.get('http://localhost:10000/ucs/aluno/'+req.params.id)
            .then(function(resposta){
                res.render('paginaInicial', {title: "Página inicial", user: req.params.id, lista: resposta.data, aluno: true});
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
                        res.render('paginaInicial', {title: "Página inicial", user: req.params.id, lista: resposta.data, aluno: false});
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
                        res.render('paginaInicial', {title: "Página inicial", user: req.params.id, lista: resposta.data, aluno: true});
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

module.exports = router;