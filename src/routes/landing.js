module.exports = {
  method: 'GET',
  path: '/',
  handler: (req, reply) => {
      
      reply.view('landing');
      // reply('Landing page!');
  }
}