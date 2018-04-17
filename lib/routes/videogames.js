const notFound = require('./not-found');
const videogamesTable = require('../models/videogames');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res); //? replaces 'if else' statement
}; //setting up our initial'get' so we can account for choosing which get to use.
// either getOne or getAll. this is an expression so you can't use it with a big codeblock.

const getOne = (id, req, res) => { //creating more methods so we can seperate the different 'gets'
    videogames.returnOne(id)
        .then(one => {
            res.send(one);
        });
};

const getAll = (req, res) => {

};

const post = (req, res) =>{
    
};

const put = (req, res) => { 

};

const del = (req, res) => { 

};

const methods = { get, post, put, delete: del};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};