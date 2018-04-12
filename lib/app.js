const { parse } = require('url');
const birds = require('./routes/birds');
const notFound = require('./routes/not-found');
const bodyParser = require('./body-parser');

const routes = { __proto__: null, birds };

module.exports = (request, response) => {
    const parsedUrl = parse(request.url, true);
    request.query = parsedUrl.query;
    request.paths = parsedUrl.pathname.slice(1).split('/');
    const routeKey = request.paths[0];

    response.setHeader('Content-Type', 'application/json');

    const route = routes[routeKey] || notFound;

    bodyParser(request)
        .then(body => {
            request.body = body;
            route(request, response);
        });
};