const get = require('./../handler_home');
const jwt = require('jsonwebtoken');
const hbs = require('handlebars');

module.exports = {
  method: 'GET',
  path: '/home',
  handler: (req, reply) => {
    const decoded = jwt.decode(req.state.token)
    console.log(decoded);
    console.log("Username:", decoded.user.username);
    console.log("Name:", decoded.user.name);
    console.log("avatar_url:", decoded.user.avatar_url);

    const name = decoded.user.name;
    const avatar_url = decoded.user.avatar_url;

    const options = { name, avatar_url }
    reply.view('jokes_button', options)
    // reply('HELLLOOOO')
  }

}
