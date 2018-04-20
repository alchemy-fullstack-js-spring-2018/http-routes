const dog = require('../models/dog');

const post = (req, res) => {
    dog.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const get = (req, res) => {
    const id = req.paths[1];
    getOne(id, req, res);
};

const getOne = (id, req, res) => {
    dog.selectOne(id)
        .then(one => {
            res.send(one);
        });
};

const put = (req, res) => {
    const id = req.paths[1];
    dog.update(id, req.body).then(updated => {
        res.send(updated);
    });
};

const methods = { post, get, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};