const get = require('../handler_home.js');
const hbs = require('handlebars');

const secure = {
  method: 'GET',
  path: '/secure',
  config: {
    auth: 'jwt'
  },
  handler: (req, reply) => {

    get.getData((err, jokes) => {
      if (err) {
        return reply.redirect('Something went wrong sorry!');
      }
      // console.log("I AM HEreEEEE");
      const options = { jokes }
      reply.view('index', options)


    });

  },
}

module.exports = secure
