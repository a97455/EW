var axios = require('axios')
var Docente = require('../models/docente');
var Aluno = require('../models/aluno');
var DocenteController = require('../controllers/docente');
var AlunoController = require('../controllers/aluno');
var Token = require('../models/token');
var jwt = require('jsonwebtoken');
var secretKey = 'EW2024';

// Função para gerar e armazenar o token
const generateAndStoreToken = async function(userId, userType) {
    const payload = {
        userId: userId,
        userType: userType
    };

    const token = jwt.sign(payload, secretKey, {expiresIn: '1d'});

    const tokenDocument = new Token({
        token: token,
        userId: userId,
        userType: userType
    });

    if (userType=='Aluno'){
        AlunoController.insertToken(userId,token)
        .then(function(){
            return tokenDocument.save()
        })
    }
    else if (userType=='Docente'){
        DocenteController.insertToken(userId,token)
        .then(function(){
            return tokenDocument.save()
        })
    }
}

// Função para autenticar user
module.exports.authenticateUser = async function(userId, password, userType) {
    let user;
    if (userType == 'Docente') {
        user = await Docente.findById(userId);
    } else if (userType == 'Aluno') {
        user = await Aluno.findById(userId);
    } else {
        throw new Error("Tipo de usuário inválido!");
    }

    if (user && (password == user.password)) {
        return await generateAndStoreToken(userId, userType);
    } else {
        throw new Error("ID ou PassWord inválidos!");
    }
}

// Função para verificar o token
module.exports.verifyToken = async function(userID, token) {
    try {
        if (userID == undefined || token == undefined){
            throw new Error("Token não existente")
        } 

        let url;
        if (userID[0] === 'd') {
            url = 'http://localhost:10000/docentes/' + userID;
        } else if (userID[0] === 'a') {
            url = 'http://localhost:10000/alunos/' + userID;
        } else {
            throw new Error('Invalid userID');
        }

        const resposta = await axios.get(url);
        return token === resposta.data.token;
    } catch (error) {
        return false;
    }
}