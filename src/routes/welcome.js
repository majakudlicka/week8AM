const env2 = require('env2')('./config.env');
const request = require('request');
const qs = require('querystring')

module.exports = {
  method: 'GET',
  path: '/welcome',
  config: {auth: false},
  handler: (req, reply) => {
    const query = req.url.query.code;
    const options = {
      url: `https://github.com/login/oauth/access_token?code=${query}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }

    request.post(options, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        const access_token = qs.parse(body).access_token;
        console.log("access_token", access_token);

        const url = 'https://api.github.com/user';

        const headers = {
        'User-Agent': 'oauth_github_jwt',
        Authorization: `token ${access_token}`
        };

        request.get({url:url, headers:headers}, (error, response, body) => {
          const parsedBody = JSON.parse(body);

          let options = {
            'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
            'subject': 'github-data'
          };

          let payload = {
            'user': {
              'username': parsedBody.login,
              'img_url': parsedBody.avatar_url,
              'user_id': parsedBody.id
            },
            'accessToken': access_token
          };
        })


      }
    })
    return reply("Welcome page!")
  }

}
