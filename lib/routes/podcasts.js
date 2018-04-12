const podcast = require('../models/podcast');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    podcast.selectOne(id).then(one => {
        res.end(JSON.stringify(one));
    });
};

const getAll = (req, res) => {
    podcast.selectAll().then(podcasts => {
        res.end(JSON.stringify(podcasts));
    });
};

const post = (req, res) => {
    podcast.insert(req.body).then(saved => {
        res.end(JSON.stringify(saved));
    });
};

const del = (req, res) => {
    podcast.delete(req.body).then(deleded => {
        res.end(JSON.stringify(deleded));
    });
};

const methods = { get, post, put, del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};