var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
const emails = require('../inc/emails');
var router = express.Router();

module.exports = function(io){

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

  // 

  router.get('/contact', function(req, res, next) {

    contacts.render(req, res);

  })

  router.post('/contact', function(req, res, next) {

    if(!req.body.name){
      contacts.render(req, res, 'Digite o nome')
    } else if(!req.body.email){
      contacts.render(req, res, 'Digite o email')
    } else if(!req.body.message){
      contacts.render(req, res, 'Digite a mensagem')
    } else{
      
      contacts.save(req.body).then(results => {

        req.body = {};
        io.emit('dashboard update');

        contacts.render(req, res, null, 'Contato enviado com sucesso!')

      }).catch(err => {
        
        contacts.render(req, res, err.message);

      });

    }

  })

  // 

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

        io.emit('dashboard update');

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

  });

  router.post('/subscribe', function(req, res, next){

    emails.save(req).then(results =>{

      res.send(results)

    }).catch(err => {

      res.send(err);

    });



  })

  return router;

};
