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
    foto: req.body._id+'.' + req.file.mimetype.split('/')[1],
    email: req.body.email,
    curso: req.body.curso,
    ucs: []
  }
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


router.delete('/:id', async function(req, res) {
  const alunoId = req.params.id;

  try {
    const aluno = await Aluno.findById(alunoId);

    if (!aluno) {
      return res.status(404).jsonp({ error: 'Aluno not found' });
    }

    // Delete the file associated with the aluno
    const filePath = __dirname + '/../FileStore/' + aluno.foto;
    console.log(filePath)
    fs.unlink(filePath, async function(error) {
      if (error) {
        // Handle the error if the file does not exist
        console.error('File deletion error:', error);
        return res.status(500).jsonp({ error: 'File deletion error' });
      }

      // Delete the aluno record from the database
      try {
        await Aluno.delete({ _id: alunoId });
        return res.jsonp({ message: 'Aluno deleted successfully' });
      } catch (err) {
        return res.status(500).jsonp({ error: 'Database deletion error' });
      }
    });
  } catch (err) {
    return res.status(500).jsonp({ error: 'Database find error' });
  }
});



module.exports = router;