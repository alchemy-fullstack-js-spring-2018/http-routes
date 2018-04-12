const notFound = require('./not-found');
const pokemon = require('../models/pokemon');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    pokemon.selectOne(id)
        .then(one => {
            res.end(JSON.stringify(one));
        });
};

const getAll = (req, res) => {
    pokemon.selectAll().then(pokemons => {
        res.end(JSON.stringify(pokemons));
    });
};

const post = (req, res) => {
    pokemon.insert(req.body).then(saved => {
        res.end(JSON.stringify(saved));
    });
};

const put = (req, res) => {
    pokemon.update(req.body).then(updated => {
        res.end(JSON.stringify(updated));
    });
};

const del = (req, res) => {
    pokemon.delete(req.paths[1])
        .then(() => res.end(JSON.stringify({ removed: true })));
};

const methods = { get, post, put, delete: del };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};