const dog = require('../models/dog');

const post = (req, res) => {
    dog.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    dog.selectOne(id)
        .then(one => {
            res.send(one);
        });
};

const getAll = (req, res) => {
    dog.selectAll().then(dogs => {
        res.send(dogs);
    });
};

const put = (req, res) => {
    const id = req.paths[1];
    dog.update(id, req.body).then(updated => {
        res.send(updated);
    });
};

const del = (req, res) => {
    dog.delete(req.paths[1])
        .then(() => res.send({ removed: true }));
};

const methods = { post, get, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};