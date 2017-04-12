const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const hbs = require('handlebars');
const cookieAuth = require('hapi-auth-cookie');
const fs = require('fs');
const path = require('path');
const haj = require('hapi-auth-jwt2');
const users = require('../database/users');


const routes = require('./routes');

const server = new hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 3000,
  tls: process.env.NODE_ENV !== 'production' && {
       key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
       cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
   }
});

server.register([inert, vision, cookieAuth, haj], (err) => {
  if (err) throw err;

  const validate = (token, request, callback) => {
    console.log("token", token); // decoded token, it automatically decodes it
    if (!users[token.user.user_id]) {
      return callback(null, false);
    }
    return callback(null, true);
  }

  const strategyOptions = {
    key: process.env.JWT_SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  }

  server.auth.strategy('jwt', 'jwt', strategyOptions);

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
