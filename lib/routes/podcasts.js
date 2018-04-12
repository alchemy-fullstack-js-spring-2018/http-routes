const { parse } = require('url');
const client = require('../db-client');

const get = (req, res) => {
    // const id = req.paths[1];
    getAll(req, res);
};

const getAll = (req, res) => {
    client.query('SELECT * FROM podcasts;')
        .then(({ rows }) => res.end(JSON.stringify(rows)));
};

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};