const notFound = require('./not-found');
const band = require('../models/band');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    band.selectOne(id)
        .then(one => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(one));
        });
};

const getAll = (req, res) => {
    band.selectAll()
        .then(bands => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(bands));
        });
};

const post = (req, res) => {
    band.insert(req.body)
        .then(added => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(added));
        });
};

const del = (req, res) => {
    band.delete(req.paths[1])
        .then(() => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ removed: true }));
        });
};

const put = (req, res) => {
    band.update(req.body, req.paths[1])
        .then(updated => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(updated));
        });
};
const methods = { get, post, delete: del, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};