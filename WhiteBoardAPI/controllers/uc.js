var UC = require('../models/uc')

module.exports.list = function(){
    return UC.find().sort({nome: 1}).exec()
}

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