'use strict';

const { parse } = require('url');
const videoGames = require('../../lib/routes/videogames');
const notFound = require('../../lib/routes/not-found');

const routes = {
    videoGames
};

module.exports = (req, res) => {
    const key = parse(req.url).pathname.slice(1).split('/')[0];
    
    const route = routes[key] || notFound;

    route(req, res);

}