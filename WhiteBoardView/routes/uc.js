var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:id/aluno', function(req, res) {
    axios.get('http://localhost:10000/ucs/' + req.params.id)
    .then(function(response){
        const uc = response.data;
        if (uc != null){
            var listaNomesProfessores = [];
            
            // Loop através dos docentes da UC
            for (var i = 0; i < uc.docentes.length; i++) {
                
                // Faz a solicitação para obter o nome do professor
                axios.get('http://localhost:10000/docentes/' + uc.docentes[i])
                .then(function(responseProfessores){
                    listaNomesProfessores.push(responseProfessores.data.nome);
                    
                    // Verifica se todos os nomes dos professores foram obtidos
                    if (listaNomesProfessores.length === uc.docentes.length) {
                        var d = new Date().toISOString().substring(0,16);
                        res.render('informacoesUC', {uc: uc, professores: listaNomesProfessores, data: d});
                    }
                })
                .catch(function(errorProfessores){
                    console.error('Erro ao obter o nome do professor:', errorProfessores);
                    res.render('error', {message: 'Erro ao obter o nome do professor'});
                });
            }
        } else {
            res.render('error', {message: 'Docente não registrado na WhiteBoard'});
        }
    })
    .catch(function(errorUC){
        console.error('Erro ao obter os dados da UC:', errorUC);
        res.render('error', {message: 'Rota não existente na WhiteBoardAPI'});
    });
});

module.exports = router;
