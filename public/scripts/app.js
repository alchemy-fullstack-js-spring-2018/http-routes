'use strict';

const { parse } = require('url');
const videoGames = require('../../lib/routes/videogames');
const notFound = require('../../lib/routes/not-found');

const routes = {
    videoGames
};

module.exports = (req, res) => {
    const parsedURL = parse(req.url);
    req.paths = parsedURL.pathname.slice(1); //subsequent paths can get the parsedURL.
    const key = req.paths.split('/')[0];
    const route = routes[key] || notFound;
    route(req, res);

};