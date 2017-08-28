const express = require('express');
const path = require('path');
const expressWs = require('express-ws');
const winston = require('winston');
const serveStatic = require('serve-static')

const app = express();
const ws = expressWs(app);

winston.configure({
  level: 'debug',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'logs.log' })
  ]
});

app.use(serveStatic(path.join(__dirname, 'public')))

app.ws('/ws', (ws, req) => {
  winston.debug("Received new websocket connection.");

  ws.on('message', (msg) => {
    winston.debug("Received message from WS:", msg);
    try {
      var json = JSON.parse(msg),
        dia1 = new Date(json.actual),
        dia2 = new Date(json.nacimiento);
      
      var oneDay = 24 * 60 * 60 * 1000;
      var diffDays = Math.round(Math.abs((dia1.getTime() - dia2.getTime()) / (oneDay)));
      var fisico = diffDays % 23;
      var emocional = diffDays % 28;
      var intelectual = diffDays % 33;
      
      winston.debug(dia1);
      winston.debug(dia2);
      winston.debug(diffDays);
      winston.debug(fisico);
      winston.debug(intelectual);
      winston.debug(emocional);

      ws.send(JSON.stringify({diffDays: diffDays, fisico: fisico, intelectual: intelectual, emocional: emocional}));

    } catch(e) {
      winston.error("Failed to parse JSON:", e);
    }
  });

  ws.on('close', () => {
    winston.debug("Websocket connection is closing down.");
  });
});

app.listen(3000, () => {
  winston.info('App listening on port 3000');
});
