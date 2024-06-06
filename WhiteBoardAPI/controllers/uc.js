var UC = require('../models/uc')

module.exports.findById = function(id){
    return UC.findOne({_id: id}).exec()
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

module.exports.addDocente = async function(idUC, codUC, idDocente) {
    const uc = await UC.findOne({ _id: idUC, codUC: codUC });

    if (!uc) {
        throw new Error("UC não existente ou Código UC incorreto.");
    }

    if (uc.docentes.includes(idDocente)) {
        throw new Error("Docente já está registado na UC.");
    }

    await UC.updateOne({_id: idUC }, {$addToSet: {docentes: idDocente}}).exec();
}

module.exports.addAluno = async function(idUC, codUC, idAluno) {
    const uc = await UC.findOne({ _id: idUC, codUC: codUC });

    if (!uc) {
        throw new Error("UC não existente ou Código UC incorreto.");
    }

    if (uc.alunos.includes(idAluno)) {
        throw new Error("Aluno já está registado na UC.");
    }

    await UC.updateOne({_id: idUC }, {$addToSet: {alunos: idAluno}}).exec();
}