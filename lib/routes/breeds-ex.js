const notFound = require('./not-found');
const breed = require('../models/breed');

const get = (req, res) => {
    const name = req.paths[1];
    name ? getOne(name, req, res) : getAll(req, res);
};

const getOne = (name, req, res) => {
    breed.showBreed(name)
        .then(breed => {
            res.send(breed);
        });
};

const getAll = (req, res) => {
    breed.showBreeds().then(breeds => {
        res.send(breeds);
    });
};

const post = (req, res) => {
    breed.addBreed(req.body).then(newBreed => {
        res.send(newBreed);
    });
};

const put = (req, res) => {
    breed.updateBreed(req.body).then(updated => {
        res.send(updated);
    });
};

const del = (req, res) => {
    breed.deleteBreed(req.paths[1])
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};