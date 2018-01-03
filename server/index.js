const ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = 3000;
const DEFAULT_HOSTNAME = '127.0.0.1';

const http = require('http');
const express = require('express');
const config = require('./config');
const app = express();

var server;

app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

app.use(function(req,res,next){

  res.header('Access-Control-Allow-Origin', '*'); 
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept,Content-Length, X-Requested-With, Auth');
  next();
})


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