const app = require('./lib/app');
const { createServer } = require('http');
createServer(app).listen(3000);