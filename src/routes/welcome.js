const env2 = require('env2')('./config.env');
const request = require('request');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const get = require('../handler_home.js');
const hbs = require('handlebars');


module.exports = {
  method: 'GET',
  path: '/welcome',
  config: {auth: false},
  handler: (req, reply) => {
    const query = req.url.query.code;

    console.log("ONE1:", req.state);

    if (req.state.token){
      return reply.redirect('/home')
    }

    const options = {
      url: `https://github.com/login/oauth/access_token?code=${query}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }

    request.post(options, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        let access_token = qs.parse(body).access_token;
        const url = 'https://api.github.com/user';
        console.log("access_token", access_token);
        const headers = {
        'User-Agent': 'oauth_github_jwt',
        Authorization: `token ${access_token}`
        };

        request.get({url:url, headers:headers}, (error, response, body) => {
          const parsedBody = JSON.parse(body);

          // console.log(parsedBody);

          let options = {
            'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
            'subject': 'github-data'
          };

          let payload = {
            'user': {
              'username': parsedBody.login,
              'name': parsedBody.name,
              'avatar_url': parsedBody.avatar_url,
              'user_id': parsedBody.id
            },
            'accessToken': access_token
          };
          jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) return console.log(err);
            // console.log(token);
            let config = {
              path: '/',
              isSecure: process.env.NODE_ENV === 'PRODUCTION'
            }
            const name= parsedBody.name;
            const avatar_url = parsedBody.avatar_url;

            const options = {name, avatar_url};

            // console.log("dis cookie got set!")
              reply
                .view('jokes_button', options)
                .state('token', token, config);
          });


        })


      }
    })

  }

}
