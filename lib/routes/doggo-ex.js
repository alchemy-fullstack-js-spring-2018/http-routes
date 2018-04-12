const notFound = require('./not-found');
const doggos = require('../models/doggos');

const get = (req, res) => {
    const name = req.paths[1];
    name ? getOne(name, req, res) : getAll(req, res);
};

const getOne = (name, req, res) => {
    doggos.showDoggo(name)
        .then(doggo => {
            res.send(doggo);
        });
};

const getAll = (req, res) => {
    doggos.showDoggos().then(doggos => {
        res.send(doggos);
    });
};

const post = (req, res) => {
    doggos.addBorker(req.body).then(newBorker => {
        res.send(newBorker);
    });
};

const put = (req, res) => {
    doggos.updateBorker(req.body).then(updated => {
        res.send(updated);
    });
};

const del = (req, res) => {
    doggos.deleteBorker(req.paths[1])
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};