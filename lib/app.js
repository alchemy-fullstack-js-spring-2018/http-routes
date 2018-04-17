'use strict';
const { createReadStream } = require('fs');

const { parse } = require('url');
const videoGames = require('../../lib/routes/videogames');
const notFound = require('../../lib/routes/not-found');
const bodyParser = require('./bodyparser');

const routes = {
    _proto_: null,
    videoGames
};

module.exports = (req, res) => {

    if(req.url === '/' && req.method === 'GET') {
        return createReadStream(`${__dirname}/index.html`) //dirname = directory name
            .pipe(res); //attaches writable stream to the readable.
    }

    const parsedURL = parse(req.url, true);
    req.query = parsedURL.query;
    req.paths = parsedURL.pathname.slice(1).split('/'); //subsequent paths can get the parsedURL.path is split into an array of it's parts.
    const key = req.paths[0];
    const route = routes[key] || notFound;
    route(req, res);

    res.setHeader('Content-Type', 'application/json');
    res.send = obj => res.end(JSON.stringify(obj));

    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });

};