const express = require('express');
const path = require('path');
const expressWs = require('express-ws');
const log4js = require('log4js');
const serveStatic = require('serve-static')

const app = express();
const ws = expressWs(app);

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'application.log' }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'debug' }
  }
});

let logger = log4js.getLogger();

app.use(serveStatic(path.join(__dirname, 'public')))

app.ws('/ws', (ws, req) => {
  logger.debug("Received new websocket connection.");

  ws.on('message', (msg) => {
    logger.debug("Received message from WS:", msg);
    try {
      var json = JSON.parse(msg),
        dia1 = new Date(json.actual),
        dia2 = new Date(json.nacimiento);
      
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
