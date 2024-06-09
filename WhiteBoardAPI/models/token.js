var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['Docente', 'Aluno'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d' // Token expires in 1 day
    }
});

module.exports = mongoose.model('tokens', tokenSchema)