const server = require('./server');
const router = require('./router');
const requestHandlers = require('./request-handlers');

let handle = {};
handle['/'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/sendmail'] = requestHandlers.sendEmail;
server.start(router.route, handle);
