const podcast = require('../models/podcast');

const get = (req, res) => {
    // const id = req.paths[1];
    getAll(req, res);
};

const getAll = (req, res) => {
    podcast.selectAll().then(podcasts => {
        res.end(JSON.stringify(podcasts));
    });
};

const post = (req, res) => {
    podcast.insert(req.body).then(saved => {
        console.log(saved);
        res.end(JSON.stringify(saved));
    });
};

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};