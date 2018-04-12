const notFound = require('./not-found');
const book = require('../models/book');

const post = (req, res) => {
    book.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const getOne = (id, req, res) => {
    book.selectOne(id)
        .then(one => {
            res.send(one);
        });
};

const methods = { post, getOne };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};