const ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = process.env.PORT || 8080;
const DEFAULT_HOSTNAME = '127.0.0.1';
const cors = require('cors');
const http = require('http');
const express = require('express');
const config = require('./config');
const app = express();
app.use(cors());
var server;

app.use(express.static(__dirname + '/public'));
app.get('/',(req, res) => {  
  res.sendFile(__dirname+'/public/index.html');
});

app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);



require('./config/mongoose').init(app);
require('./config/models').init(app);
require('./config/passport').init(app);
require('./config/express').init(app);
require('./config/routes').init(app);

app.use((err, req, res, next) => {
  res.status(500).json(err);
});

if (!module.parent) {
  server = http.createServer(app);
  server.listen(
    config.port || DEFAULT_PORT,
    config.hostname || DEFAULT_HOSTNAME,
    () => {
      console.log(`${config.app.name} is running`);
      console.log(`   listening on port: ${config.port}`);
      console.log(`   environment: ${ENV.toLowerCase()}`);
    }
  );
}

module.exports = app;