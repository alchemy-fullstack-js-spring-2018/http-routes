const { parse } = require('url');
const plants = require('./routes/plants');
cons notFound = require('./routes/not-found');


module.exports = (req, res) => {
    const key = parse(req.url).pathname.slice(1).split('/')[0];
    const route = routes[key] || notFound;
    route(req, res);
};
