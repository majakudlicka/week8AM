const secure = {
  method: 'GET',
  path: '/secure',
  config: {
    auth: 'jwt'
  },
  handler: (req, reply) => {
    reply('This is the secure page!');
  },
}

module.exports = secure
