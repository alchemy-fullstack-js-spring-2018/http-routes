'use strict';

const { parse } = require('url');
const videoGames = require('../../lib/routes/videogames');
const notFound = require('../../lib/routes/not-found');
const bodyParser = require('body-parser');

const routes = {
    videoGames
};

module.exports = (req, res) => {
    const parsedURL = parse(req.url, true);
    req.query = parsedURL.query;
    req.paths = parsedURL.pathname.slice(1).split('/'); //subsequent paths can get the parsedURL.path is split into an array of it's parts.
    const key = req.paths[0];
    const route = routes[key] || notFound;
    route(req, res);

};