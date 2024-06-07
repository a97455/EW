var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:id/aluno/:idAluno', function(req, res) {
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
                        res.render('informacoesUC', {uc: uc,  idUser: req.params.idAluno, professores: listaNomesProfessores, data: d, docente: false});
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

router.get('/:id/docente/:idDocente', function(req, res) {
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
                        res.render('informacoesUC', {uc: uc, idUser: req.params.idDocente, professores: listaNomesProfessores, data: d, docente: true});
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

router.get('/:id/docente/:idDocente/adicionarAula', function(req, res) {
  var d = new Date().toISOString().substring(0,16);
  const id = req.params.id;
  res.render('novaAula', {id: id, data: d});
})

router.post('/:id/docente/:idDocente/adicionarAula', function(req, res) {
    axios.get('http://localhost:10000/ucs/' + req.params.id)
    .then(function(response) {
        const uc = response.data;
        
        // Crie um novo objeto para representar a nova aula
        const novaAula = {
            tipo: req.body.tipo,
            data: req.body.data,
            sumario: req.body.topicos.split('\n')
        };

        uc.aulas.push(novaAula);

        axios.put('http://localhost:10000/ucs/' + req.params.id, uc)
        .then(function(response) {
            res.redirect("/ucs/"+req.params.id+"/docente/"+req.params.idDocente)
        })
        .catch(function(error) {
            console.error('Erro ao atualizar UC:', error);
            res.status(500).json({ error: 'Erro ao atualizar a UC' });
        });
    })
    .catch(function(error) {
        console.error('Erro ao obter UC:', error);
        res.status(500).json({ error: 'Erro ao obter a UC' });
    });
});

router.get('/:id/docente/:idDocente/editar', function(req, res){
    axios.get('http://localhost:10000/ucs/' + req.params.id)
    .then(function(response) {
        const uc = response.data;
        var d = new Date().toISOString().substring(0,16);
        res.render('editarUC', {uc: uc, data: d});
    })
    .catch(function(error) {
        console.error('Erro ao obter UC:', error);
        res.status(500).json({ error: 'Erro ao obter a UC' });
    });
})

router.post('/:id/docente/:idDocente/editar', function(req, res){
    const novaAula = {
        horario: {
            teoricas: req.body.horarioTeorico.split('\n').map(horario => horario.trim()).filter(horario => horario !== ''),
            praticas: req.body.horarioPratico.split('\n').map(horario => horario.trim()).filter(horario => horario !== '')
        },
        avaliacao: req.body.avaliacao.split('\n'),
        datas: {
            teste: req.body.dataTeste,
            exame: req.body.dataExame,
            projeto: req.body.dataProjeto
        },
    };

    axios.put('http://localhost:10000/ucs/' + req.params.id, novaAula)
    .then(function() {
        res.redirect("/ucs/"+req.params.id+"/docente/"+req.params.idDocente)
    })
    .catch(function(error) {
        console.error('Erro ao obter UC:', error);
        res.status(500).json({ error: 'Erro ao obter a UC' });
    });
});

module.exports = router;