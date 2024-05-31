var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno')
var multer = require('multer')
const upload = multer({ dest: 'uploads/' })
var fs = require('fs')

router.get('/:id', function(req, res) {
    Aluno.findById(req.params.id)
    .then(function(data){
      res.jsonp(data)
    })
    .catch(function(erro){
      res.jsonp(erro)
    })
});

router.post('/', upload.single('foto'), function(req, res){
  var aluno={
    _id : req.body._id,
    nome: req.body.nome,
    foto:'foto.' + req.file.originalname.split('.')[1],
    email: req.email,
    curso: req.curso,
    ucs: []
  }
  console.log("cheguei")
  Aluno.insert(aluno)
    .then(data => {
      let oldPath = __dirname + '/../' + req.file.path 
      let newPath = __dirname + '/../FileStore/' + aluno._id + "." + req.file.mimetype.split('/')[1] 
      fs.rename(oldPath, newPath, function(error){
        if(error) throw error
        res.jsonp(data); 
      });
    })
    .catch(erro => res.jsonp(erro))
});


module.exports = router;