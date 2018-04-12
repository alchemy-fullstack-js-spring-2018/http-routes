const blazer = require('../models/blazer');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    blazer.selectOne(id)
        .then(one => {
            res.send(one);
        });
};

const getAll = (req, res) => {
    blazer.selectAll().then(blazers => {
        res.send(blazers);
    });
};

const post = (req, res) => {
    blazer.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const put = (req, res) => {
    blazer.update(req.body).then(updated => {
        res.send(updated);
    });
};

const del = (req, res) => {
    blazer.delete(req.paths[1])
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};