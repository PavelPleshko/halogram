module.exports={
	port:3000,
	hostname:'127.0.0.1',
	baseUrl:'http://localhost:3000',
	 mongodb: {
    uri: 'mongodb://localhost/hologram'
  },
  app: {
    name: 'Hologram'
  },
  serveStatic: true,
  session: {
    type: 'mongo',
    secret: 'u+J%E^9!hx?piXLCfiMY.EDc',
    resave: false,
    saveUninitialized: true
  }
}