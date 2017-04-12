const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const hbs = require('handlebars');
const cookieAuth = require('hapi-auth-cookie');
const fs = require('fs');
const path = require('path');


const routes = require('./routes');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 3000,
  tls: {
       key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
       cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
   }
});

server.register([inert, vision, cookieAuth], (err) => {
  if (err) throw err;

  var options = {
    password: 'Iamatemporarypasswordofover32characterssothatwecangetcookiesworking',
    cookie: 'cookie-name',
    isSecure: false,
    ttl: 2 * 60 * 60000
  };
  server.auth.strategy('base', 'cookie', 'optional', options);

  server.route(routes);
});

server.views({
  engines: { hbs },
  path: 'views',
  layout: 'default',
  layoutPath: 'views/layouts',
  partialsPath: 'views/partials',
});

module.exports = server;
