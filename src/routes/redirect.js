module.exports = {
  method: 'GET',
  path: '/redirect',
  handler: (request, reply) => {
    reply.redirect('./secure.js');
  }
}
