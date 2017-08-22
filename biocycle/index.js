const express = require('express');
const path = require('path');
const expressWs = require('express-ws');
const winston = require('winston');

const app = express();
const ws = expressWs(app);

winston.configure({
  level: 'debug',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'logs.log' })
  ]
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/resources/index.html'));
});

app.get('/resources/:file', (req, res) => {
  winston.debug("Serving file:", req.params.file);
  res.sendFile(path.join(__dirname + '/resources/' + req.params.file));
});

app.ws('/ws', (ws, req) => {
  winston.debug("Received new websocket connection.");

  ws.on('message', (msg) => {
    // TODO - Parse MSG object, send back biocycle results
    winston.debug("Received message from WS:", msg);
    ws.send("Hey, I got your msg: " + msg);
  });

  ws.on('close', () => {
    winston.debug("Websocket connection is closing down.");
  });
});

app.listen(3000, () => {
  winston.info('App listening on port 3000');
});
