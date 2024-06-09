const UC = require('../models/uc')

module.exports.findById = function(id){
    return UC.findOne({_id: id}).exec()
}

module.exports.findGradesByID = function(idAluno){
    return UC.aggregate([
        { $unwind: "$notas" },
        { $match: { "notas.aluno": idAluno } },
        {
            $project: {
                _id: 0,
                aluno: "$notas.aluno",
                teste: "$notas.teste",
                exame: "$notas.exame",
                projeto: "$notas.projeto",
                uc: "$titulo"
            }
        }
    ]).exec()
}

module.exports.insert = function(uc){
    return UC.create(uc)
}

module.exports.update = function(id,uc){
    return UC.updateOne({_id:id}, uc)
}

module.exports.delete = function(id) {
    return UC.findByIdAndDelete(id).exec()
}

module.exports.ucsAluno = function(id){
    return UC.find({alunos: id}).exec()
}

module.exports.ucsDocente = function(id){
    return UC.find({docentes: id}).exec()
}

module.exports.addDocente = function(idUC, codUC, idDocente) {
    return UC.updateOne({_id: idUC, codUC: codUC }, {$addToSet: {docentes: idDocente}}).exec();
}

module.exports.addAluno = function(idUC, codUC, idAluno) {
    return UC.updateOne({_id: idUC, codUC: codUC }, {$addToSet: {alunos: idAluno}}).exec();
}