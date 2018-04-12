const { parse } = require('url');
const invertebrates = require('./routes/invertebrates');
const bodyParser = require('./body-parser');
const notFound = require('./routes/not-found');
const { createReadStream } = require('fs');

const routes = {
    __proto__: null,
    invertebrates,
};

module.exports = (req, res) => {

    //eslint-disable-next-line
    if(req.url === "/" && req.method === "GET") {
        return createReadStream(`${__dirname}/index.html`)
            .pipe(res);
    }

    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.paths = parsedUrl.pathname.slice(1).split('/');
    const key = req.paths[0];

    res.setHeader('Content-Type', 'application/json');
    res.send = obj => res.end(JSON.stringify(obj));

    const route = routes[key] || notFound;

    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};