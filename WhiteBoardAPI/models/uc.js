var mongoose = require("mongoose")

var horarioSchema = new mongoose.Schema({
    teoricas: [String],
    praticas: [String]
}, {versionKey: false})

var dataSchema = new mongoose.Schema({
    teste: String,
    exame: String,
    projeto: String
}, {versionKey: false})

var aulaSchema = new mongoose.Schema({
    tipo: String,
    data: String,
    sumario: [String],
}, {versionKey: false})

var ucSchema = new mongoose.Schema({
    _id : String, 
    codUC: String,
    titulo: String,
    docentes: [String],
    alunos: [String],
    horario: horarioSchema,
    avaliacao: [String],
    datas: dataSchema,
    aulas: [aulaSchema]
}, {versionKey: false})

module.exports = mongoose.model('ucs', ucSchema)