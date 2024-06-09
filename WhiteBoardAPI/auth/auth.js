var Docente = require('../models/docente');
var Aluno = require('../models/aluno');
var Token = require('../models/token');
var jwt = require('jsonwebtoken');
var secretKey = 'EW2024';

// Função para gerar e armazenar o token
module.exports.generateAndStoreToken = async function(userId, userType) {
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

    return tokenDocument.save();
}

// Função para verificar o acesso com base no token
module.exports.verificaAcesso = function(req, res, next) {
    var myToken = req.query.token || req.body.token;
    if (myToken) {
        jwt.verify(myToken, secretKey, function(e) {
            if (e) {
                res.status(401).jsonp({error: e});
            } else {
                next();
            }
        });
    } else {
        res.status(401).jsonp({error: "Token inexistente!"});
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
        return this.generateAndStoreToken(userId, userType);
    } else {
        throw new Error("ID ou PassWord inválidos!");
    }
}