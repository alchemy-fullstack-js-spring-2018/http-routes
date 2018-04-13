const notFound = require('./not-found');
const invertebrate = require('../models/invertebrate');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    invertebrate.selectOne(id)
        .then(one => {
            res.send(one);
        });
};

const getAll = (req, res) => {
    invertebrate.selectAll().then(inverts => {
        res.send(inverts);
    });
};

const post = (req, res) => {
    invertebrate.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const put = (req, res) => {
    invertebrate.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const del = (req, res) => {
    invertebrate.delete(req.paths[1])
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};