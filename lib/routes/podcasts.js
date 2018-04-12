const { parse } = require('url');

const get = (req, res) => {
    const id = req.paths[1];
    getAll(req, res);
};

const getAll = (req, res) => {

};

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};