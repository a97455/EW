var mongoose = require("mongoose")

var aluno = new mongoose.Schema({
    _id: String,
    nome: String,
    foto: String,
    email: String,
    curso: String,
    ucs: [String]
}, {versionKey: false})

module.exports = mongoose.model('alunos', aluno)