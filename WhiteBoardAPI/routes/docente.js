var express = require('express');
var router = express.Router();
var Docente = require('../controllers/docente')
var fs = require('fs')

var multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.get('/:id', function(req, res) {
    Docente.findById(req.params.id)
    .then(function(data){
      res.jsonp(data)
    })
    .catch(function(erro){
      res.jsonp(erro)
    })
});

router.post('/', upload.single('foto'), function(req, res) {
    var docente={
      _id : req.body._id,
      nome: req.body.nome,
      foto: req.body._id + '.' + req.file.mimetype.split('/')[1],
      categoria: req.body.categoria,
      filiacao: req.body.filiacao,
      email: req.body.email,
      webpage: req.body.webpage
    }

    Docente.insert(docente)
    .then(function(data){
      let oldPath = __dirname + '/../' + req.file.path
      let newPath = __dirname + '/../FileStore/' + req.body._id + '.' + req.file.mimetype.split('/')[1]
      fs.rename(oldPath, newPath, function(error){
          if (error) throw error
      })
      res.jsonp(data)
    })
    .catch(function(erro){
      res.jsonp(erro)
    })
});

router.put('/:id', function(req, res) {
    Docente.update(req.params.id, req.body)
    .then(function(data){
        res.jsonp(data)
    })
    .catch(function(erro){
        res.jsonp(erro)
    })
});

router.delete('/:id', function(req, res) {
    Docente.delete(req.params.id)
    .then(function(data){
      const filePath = __dirname + '/../FileStore/' + data.foto;
      console.log(filePath)
      fs.unlink(filePath, function(error) {
        if (error) {
          // Handle the error if the file does not exist
          console.error('File deletion error:', error);
          return res.status(500).jsonp({ error: 'File deletion error' });
        }
      })
      res.jsonp(data)
    })
    .catch(function(erro){
        res.jsonp(erro)
    })
});
  

module.exports = router;