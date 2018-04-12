const notFound = require('./not-found');
const book = require('../models/book');

const post = (req, res) => {
    book.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    book.selectOne(id)
        .then(one => {
            res.send(one);
        });
};

const put = (req, res) => {
    const id = req.paths[1];
    book.update(id, req.body).then(updated => {
        res.send(updated);
    });
}

const methods = { post, getOne, get, put };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};