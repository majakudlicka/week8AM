const env2 = require('env2')('./config.env');

module.exports = {
  method: 'GET',
  path: '/welcome',
  config: {auth: false},
  handler: (req, reply) => {
    const query = req.url.query.code;
    console.log(query);
    const options = {
      url: `https://github.com/login/oauth/access_token?code=${query}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }

  }
}
