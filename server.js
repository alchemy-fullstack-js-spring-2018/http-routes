const app = require('./lib/app');
const { createServer } = require('http');

const PORT = process.env.PORT || 3000;

createServer(app).listen(PORT, () => {
    console.log('server started on port', server.address().port); // eslint-disable-line
});