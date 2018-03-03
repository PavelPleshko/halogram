
module.exports={
	port:3000,
	hostname:'127.0.0.1',
	baseUrl:'http://localhost:3000',
	 mongodb: {
    uri: 'mongodb://admin:presentik12@ds012188.mlab.com:12188/project_database'
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