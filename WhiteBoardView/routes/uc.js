var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/:id/docente', function(req, res) {
    axios.get('http://localhost:10000/ucs/'+req.params.id)
    .then(function(resposta){
      const uc = resposta.data
      if (uc != null){
        var d = new Date().toISOString().substring(0,16)
        res.render('informacoesUC', {uc:uc, data: d});
      }else{
        res.render('error', {message: 'Docente não registado na WhiteBoard'})
      }
    })
    .catch(function(){
      res.render('error', {message: 'Rota não existente na WhiteBoardAPI'})
    })
})

module.exports = router;