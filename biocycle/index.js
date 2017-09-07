const express = require('express');
const path = require('path');
const expressWs = require('express-ws');
const log4js = require('log4js');
const serveStatic = require('serve-static')

const app = express();
const ws = expressWs(app);

const dbaddress = "mongodb://ClaseAppsWeb:<sistemasoperativos>@claseappsweb-shard-00-00-4ukh5.mongodb.net:27017,claseappsweb-shard-00-01-4ukh5.mongodb.net:27017,claseappsweb-shard-00-02-4ukh5.mongodb.net:27017/test?ssl=true&replicaSet=ClaseAppsWeb-shard-0&authSource=admin"
var MongoClient = require('mongodb').MongoClient;



log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    applog: { type: 'file', filename: 'application.log' }
  },
  categories: {
    default: { appenders: [ 'out', 'applog' ], level: 'debug' }
  }
});

let logger = log4js.getLogger('index.js');

app.use(serveStatic(path.join(__dirname, 'public')))

app.ws('/ws', (ws, req) => {
  logger.debug("Received new websocket connection.");
//do query base de datos de usuarios
  MongoClient.connect(dbaddress, function(err, db) {
  console.log("Connected correctly to server.");
  console.log(err);
  db.collection('people').find({}).then(function(e){
	  console.log(e)
  });
  db.close();
});
  
  
  ws.on('message', (msg) => {
    logger.debug("Received message from WS:", msg);
    try {
      var json = JSON.parse(msg),
        dia1 = new Date;
        dia2 = new Date(json.nacimiento);
		name = json.name;
      
      var oneDay = 24 * 60 * 60 * 1000;
      var diffDays = Math.round(Math.abs((dia1.getTime() - dia2.getTime()) / (oneDay)));
      var fisico = diffDays % 23;
      var emocional = diffDays % 28;
      var intelectual = diffDays % 33;
      
      logger.debug(dia1);
      logger.debug(dia2);
      logger.debug(diffDays);
      logger.debug(fisico);
      logger.debug(intelectual);
      logger.debug(emocional);

      ws.send(JSON.stringify({diffDays: diffDays, fisico: fisico, intelectual: intelectual, emocional: emocional}));

	  //mandar query para guardar db
		MongoClient.connect(dbaddress, function(err, db) {
  console.log("Connected correctly to server.");
  db.collection('people').insertMany([{name: name, birthday: dia2, diffDays: diffDays, fisico: fisico, intelectual: intelectual, emocional: emocional}]).then(function(result) {console.log("Pushed person!", result)})
  db.close();
});
	
    } catch(e) {
      logger.error("Failed to parse JSON:", e);
    }
  });

  ws.on('close', () => {
    logger.debug("Websocket connection is closing down.");
  });
});

app.listen(3000, () => {
  logger.info('App listening on port 3000');
});
