require('env2')('./config.env');
const users = require('../database/users');

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

  module.exports = strategyOptions
