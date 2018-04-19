const app = require('./lib/app');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    /*eslint-disable-next-line*/ 
    console.log('server has started', server.address().port);
});
