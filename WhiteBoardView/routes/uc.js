var express = require('express');
var router = express.Router();
var axios = require('axios');
var auth = require('../auth/auth')

router.get('/:id/aluno/:idAluno', function(req, res) {
    auth.verifyToken(req.params.idAluno, req.query.token)
    .then(function(response){
        if (!response){
            res.render('error', {message: 'Realize a Autenticação'})
        }
    })

    axios.get('http://WhiteBoardAPI:10000/ucs/' + req.params.id)
    .then(function(response){
        const uc = response.data;
        if (uc != null){
            var listaNomesProfessores = [];
            
            // Loop através dos docentes da UC
            for (var i = 0; i < uc.docentes.length; i++) {
                
                // Faz a solicitação para obter o nome do professor
                axios.get('http://WhiteBoardAPI:10000/docentes/' + uc.docentes[i])
                .then(function(responseProfessores){
                    listaNomesProfessores.push(responseProfessores.data.nome);
                    
                    // Verifica se todos os nomes dos professores foram obtidos
                    if (listaNomesProfessores.length === uc.docentes.length) {
                        axios.get('http://WhiteBoardAPI:10000/alunos/' + req.params.idAluno)
                        .then(function(response){
                            const user = response.data
                            res.render('informacoesUC', {uc: uc, user: user, idUser: req.params.idAluno, professores: listaNomesProfessores, docente: false});
                        })
                        .catch(function(){
                            res.render('error', {message: 'Docente não existente'});
                        })
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
    auth.verifyToken(req.params.idDocente, req.query.token)
    .then(function(response){
        if (!response){
            res.render('error', {message: 'Realize a Autenticação'})
        }
    })

    axios.get('http://WhiteBoardAPI:10000/ucs/' + req.params.id)
    .then(function(response){
        const uc = response.data;
        if (uc != null){
            var listaNomesProfessores = [];
            
            // Loop através dos docentes da UC
            for (var i = 0; i < uc.docentes.length; i++) {
                // Faz a solicitação para obter o nome do professor
                axios.get('http://WhiteBoardAPI:10000/docentes/' + uc.docentes[i])
                .then(function(responseProfessores){
                    listaNomesProfessores.push(responseProfessores.data.nome);
                    
                    // Verifica se todos os nomes dos professores foram obtidos
                    if (listaNomesProfessores.length === uc.docentes.length) {
                        axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
                        .then(function(response){
                            const user = response.data
                            res.render('informacoesUC', {uc: uc, user: user, idUser: req.params.idDocente, professores: listaNomesProfessores, docente: true});
                        })
                        .catch(function(){
                            res.render('error', {message: 'Docente não existente'});
                        })
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

router.get('/:id/docente/:idDocente/editar', function(req, res){
    auth.verifyToken(req.params.idDocente, req.query.token)
    .then(function(response){
        if (!response){
            res.render('error', {message: 'Realize a Autenticação'})
        }
    })

    axios.get('http://WhiteBoardAPI:10000/ucs/' + req.params.id)
    .then(function(response) {
        const uc = response.data;
        axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
        .then(function(resposta){
            res.render('editarUC', {docente: resposta.data, idDocente: req.params.idDocente, uc: uc});
        })

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

    axios.put('http://WhiteBoardAPI:10000/ucs/' + req.params.id, novaAula)
    .then(function() {
        axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
        .then(function(resposta){
            res.redirect("/ucs/"+req.params.id+"/docente/"+req.params.idDocente+"?token="+resposta.data.token)
        })
        .catch(function(){
            res.render('error', {message: 'Docente não existente'});
        })
    })
    .catch(function(error) {
        console.error('Erro ao obter UC:', error);
        res.status(500).json({ error: 'Erro ao obter a UC' });
    });
});

router.get('/:id/docente/:idDocente/notas', function(req, res) {
    auth.verifyToken(req.params.idDocente, req.query.token)
    .then(function(response){
        if (!response){
            res.render('error', {message: 'Realize a Autenticação'})
        }
    })

    axios.get('http://WhiteBoardAPI:10000/ucs/' + req.params.id)
    .then(function(response){
        const uc = response.data;
        axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
        .then(function(resposta){
            res.render('verNotasDocente', {uc: uc, docente: resposta.data, idAluno: req.params.idDocente, idUC: req.params.id});
        })
    })
    .catch(function(errorUC){
        console.error('Erro ao obter os dados da UC:', errorUC);
        res.render('error', {message: 'Rota não existente na WhiteBoardAPI'});
    });
});

router.get('/:id/docente/:idDocente/modificarNotas', function(req, res) {
    auth.verifyToken(req.params.idDocente, req.query.token)
    .then(function(response){
        if (!response){
            res.render('error', {message: 'Realize a Autenticação'})
        }
    })

    axios.get('http://WhiteBoardAPI:10000/ucs/' + req.params.id)
    .then(function(response){
        const uc = response.data;
        axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
        .then(function(resposta){
            res.render('modificarNotas', {uc: uc, docente: resposta.data, idDocente: req.params.idDocente, idUC: req.params.id});
        })
    })
    .catch(function(errorUC){
        console.error('Erro ao obter os dados da UC:', errorUC);
        res.render('error', {message: 'Rota não existente na WhiteBoardAPI'});
    });
});

router.post('/:id/docente/:idDocente/modificarNotas', function(req, res) {
    const notas = req.body;
    const notasPorAluno = {}; // objeto para armazenar as notas por aluno

    for (const key in notas) {
        // Divide a chave para obter o tipo de nota e o aluno
        const [notaTipo, aluno] = key.split('-');

        // Se a chave não estiver bem formada, pule para a próxima iteração
        if (!notaTipo || !aluno) {
            continue;
        }

        // Se não houver uma entrada para o aluno, criar
        if (!notasPorAluno[aluno]) {
            notasPorAluno[aluno] = { aluno };
        }

        switch (notaTipo) {
            case 'notaTeste':
                notasPorAluno[aluno]['teste'] = notas[key];
                break;
            case 'notaExame':
                notasPorAluno[aluno]['exame'] = notas[key];
                break;
            case 'notaProjeto':
                notasPorAluno[aluno]['projeto'] = notas[key];
                break;
        }
    }

    // Converta o objeto de notas por aluno em uma lista de notas
    const listaDeNotas = Object.values(notasPorAluno);

    const notasNovas = {
        notas: listaDeNotas
    };

    axios.put('http://WhiteBoardAPI:10000/ucs/' + req.params.id, notasNovas)
        .then(function() {
            axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
            .then(function(resposta){
                res.redirect("/ucs/" + req.params.id + "/docente/" + req.params.idDocente+"?token="+resposta.data.token);
            })
        })
        .catch(function(error) {
            console.error('Erro ao atualizar UC:', error);
            res.status(500).json({ error: 'Erro ao atualizar a UC' });
        });
});

router.get('/:id/docente/:idDocente/adicionarAula', function(req, res) {
    auth.verifyToken(req.params.idDocente, req.query.token)
    .then(function(response){
        if (!response){
            res.render('error', {message: 'Realize a Autenticação'})
        }
        else{
            axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
            .then(function(resposta){
                const idUC = req.params.id;
                res.render('novaAula', {docente: resposta.data, idUC: idUC, idDocente: req.params.idDocente});
            })
        }
    })
})

router.post('/:id/docente/:idDocente/adicionarAula', function(req, res) {
    axios.get('http://WhiteBoardAPI:10000/ucs/' + req.params.id)
    .then(function(response) {
        const uc = response.data;
        
        // Crie um novo objeto para representar a nova aula
        const novaAula = {
            _id: (uc.contaAulas + 1).toString(),
            tipo: req.body.tipo,
            data: req.body.data,
            sumario: req.body.topicos.split('\n')
        };

        uc.aulas.push(novaAula);

        uc.contaAulas = uc.contaAulas + 1

        axios.put('http://WhiteBoardAPI:10000/ucs/' + req.params.id, uc)
        .then(function() {
            axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
            .then(function(resposta){
                res.redirect("/ucs/"+req.params.id+"/docente/"+req.params.idDocente+"?token="+resposta.data.token)
            })
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

router.post('/:id/docente/:idDocente/eliminarAula/:idAula', function(req, res){
    auth.verifyToken(req.params.idDocente, req.query.token)
    .then(function(response){
        if (!response){
            res.render('error', {message: 'Realize a Autenticação'})
        }
    })

    axios.delete("http://WhiteBoardAPI:10000/ucs/" + req.params.id + "/aula/" + req.params.idAula)
    .then(function() {
        axios.get('http://WhiteBoardAPI:10000/docentes/' + req.params.idDocente)
        .then(function(resposta){
            res.redirect("/ucs/"+req.params.id+"/docente/"+req.params.idDocente+"?token="+resposta.data.token)
        })
    })
    .catch(function(error) {
        console.error('Erro ao obter UC:', error);
        res.status(500).json({ error: 'Erro ao eliminar aula' });
    });
});

module.exports = router;