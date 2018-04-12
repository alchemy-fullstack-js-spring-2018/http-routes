const notFound = require('./not-found');
const book = require('../models/book');

const post = (req, res) => {
    book.insert(req.body).then(saved => {
        res.send(saved);
    });
};



const methods = { post };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};