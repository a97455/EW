var express = require('express');
var router = express.Router();
var Docente = require('../controllers/docente')
var fs = require('fs')

var multer = require('multer');
const { listenerCount } = require('../models/docente');
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

router.put('/:id', upload.single('foto'), async function(req, res) {

  try {
      // Fetch the existing Docente by ID
      let oldDocente = await Docente.findById(req.params.id);

      // If no oldDocente found, return an error
      if (!oldDocente) {
          return res.status(404).json({ error: "Docente não encontrado" });
      }

      // Determine the new file name if a new file is uploaded
      if (req.file) var newFileName = req.params.id + '.' + req.file.mimetype.split('/')[1]
      else newFileName = oldDocente.foto;

      // Construct the new docente object
      const docente = {
          _id: req.body._id || oldDocente._id,
          nome: req.body.nome || oldDocente.nome,
          foto: newFileName,
          categoria: req.body.categoria || oldDocente.categoria,
          filiacao: req.body.filiacao || oldDocente.filiacao,
          email: req.body.email || oldDocente.email,
          webpage: req.body.webpage || oldDocente.webpage
      };

      // Example: Save updated docente to the database
      await Docente.update(req.params.id, docente).then(function(data){
        if (req.file) {
          // Delete the old photo
          let oldPath = __dirname + '/../FileStore/' + oldDocente.foto;
          fs.unlink(oldPath, function(error) {
              if (error) console.error('Erro ao eliminar o ficheiro antigo:', error);
          });
    
          // Set new photo
          let newFilePath = __dirname + '/../FileStore/' + docente.foto;
          fs.rename(__dirname + '/../' + req.file.path, newFilePath, function(error) {
              if (error) throw error;
          });
        }
        res.jsonp(docente);
      })
      .catch(function(erro){
          res.jsonp(erro)
      })

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Não foi  possível atualizar as informações do docente" });
  }
    
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