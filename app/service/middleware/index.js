const { setupSession, addUserToLocals } = require('./sessionMiddleware');
const { isAdmin } = require('./rightsMiddleware');

module.exports = { setupSession, addUserToLocals, isAdmin };