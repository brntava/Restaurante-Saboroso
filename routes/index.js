var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', { 
      title: 'Restaurante Saboroso!' ,
      menus: results,
      isHome: true
    });

  })

});

router.get('/contact', function(req, res, next) {

  res.render('contact', {
    title: 'Contato - Restaurante Saboroso',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga ola!'
  })

})

router.get('/menu', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('menu', {
      title: 'Menu - Restaurante Saboroso',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    })

  })

})

// 

router.get('/reservation', function(req, res, next) {

  reservations.render(req, res);

})

router.post('/reservation', function(req, res, next) {

  // Manda um json com as info

  if(!req.body.name){
    reservations.render(req, res, 'Digite o nome');
  } else if(!req.body.email){
    reservations.render(req, res, 'Digite o email');
  } else if(!req.body.people){
    reservations.render(req, res, 'Digite a quantidade de pessoas');
  } else if(!req.body.date){
    reservations.render(req, res, 'Digite a data');
  } else if(!req.body.time){
    reservations.render(req, res, 'Digite a hora');
  } else{

    reservations.save(req.body).then(results =>{

      req.body = {};

      reservations.render(req, res, null, 'Reservado efetuada com sucesso!');

    }).catch(err => {

      reservations.render(req, res, err.message);

    })

  }


})

// 

router.get('/services', function(req, res, next) {

  res.render('services', {
    title: 'Servicos - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  })

})

module.exports = router;
