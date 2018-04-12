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

const methods = { get, post, put, delete: del };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};