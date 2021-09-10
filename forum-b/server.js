//REQUIREMENTS
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let path = require('path');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');
let mongo = require('mongodb').MongoClient;

//url baze, port...
const config = require('./config');

//Spajanje na bazu
let init = async () => {
  try {
    let database = await mongo.connect(config.pool);
    //ako uspije connect, nastavi sa inicijalizacijom servera
    initServer(database);
  } catch (e) {
    console.error(e);
  }
};

function initServer(database) {
  //koristimo req.body
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //Definiramo korisniku vidljivi frontend
  app.use(express.static(__dirname + '/public'));

  //Dozovljavamo CORS
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,  Authorization');
    next();
  });

  //TODO:??
  app.use(morgan('dev'));

  //Routamo na api.js sve zahtjeve pristigle na /api
  let apiRouter = require('./app/routes/api')(app, express, database.db('forum-projekt'), jwt, config.secret);
  app.use('/api', apiRouter);

  //Serviramo korisniku homepage na ruti "/"
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
  });

  //Hostamo na portu
  app.listen(config.port);
  console.log('Port : ' + config.port);
}

//Inicijalizacija spajanja na bazu
init();
