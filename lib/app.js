const { parse } = require('url');
const bands = require('./routes/bands');
const notFound = require('./routes/not-found').default;
const bodyParser = require('./body-parser');

const routes = { __proto__: null, bands };

module.exports = (req, res) => {
    
    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.paths = parsedUrl.pathname.slice(1).split('/');
    const key = req.paths[0];

    // res.setHeader('Content-Type', 'application/json');
    // res.end = obj => res.end(JSON.stringify(obj));

    const route = routes[key] || notFound;
    route(req, res);

    // bodyParser(req)
    //     .then(body => {
    //         req.body = body;
    //         route(req, res);
    //     });
};