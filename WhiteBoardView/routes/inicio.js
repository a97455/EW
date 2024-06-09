var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res) {
    res.render('login', {title: "Autenticação"});
})

router.post('/', function(req, res) {
    if (req.body._id[0] == 'd'){
        res.redirect("paginaInicial/"+req.body._id)
    }
    else if (req.body._id[0] == 'a'){
        res.redirect("paginaInicial/"+req.body._id)
    }
    else res.render('error', {message: 'Não foi possível realizar o login'});
})

router.get('/paginaInicial/:id', function(req, res) {
    if (req.params.id[0] == 'd'){
        axios.get('http://localhost:10000/ucs/docente/'+req.params.id)
        .then(function(resposta){
            axios.get('http://localhost:10000/docentes/'+req.params.id)
            .then(function(r){
                res.render('paginaInicial', {title: "Página inicial", user: r.data, lista: resposta.data, aluno: false});
            })
            .catch(function(){
                res.render('error', {message: 'Docente não encontrado'})
            })
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

module.exports = router;