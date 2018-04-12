const { parse } = require('url');
const podcast = require('../models/podcast');

const get = (req, res) => {
    // const id = req.paths[1];
    getAll(req, res);
};

const getAll = (req, res) => {
    console.log('ALL!!', podcast.selectAll());
    podcast.selectAll().then(podcasts => {
        res.end(JSON.stringify(podcasts));
    });
};

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};