const bird = require('../models/bird');
const notFound = require('./not-found');

const get = (request, response) => {
    const id = request.paths[1];
    id ? getOne(id, request, response) : getAll(request, response);
};

const getOne = (id, request, response) => {
    bird.selectOne(id)
        .then(theOne => {
            response.end(JSON.stringify(theOne));
        });
};

const getAll = (request, response) => {
    bird.selectAll()
        .then(allBirds => {
            response.end(JSON.stringify(allBirds));
        });
};

const post = (request, response) => {
    bird.insert(request.body)
        .then(inserted => {
            response.end(JSON.stringify(inserted));
        });
};

const put = (request, response) => {
    bird.update(request.body)
        .then(updated => {
            response.end(JSON.stringify(updated));
        });
};

// const del = (request, response) => {
//     bird.delete(request.paths[1])
//         .then(() => response.end(JSON.stringify({ removed: true })));
// };

const methods = { get, post, put/*, delete: del*/ };

module.exports = (request, response) => {
    const method = methods[request.method.toLowerCase()] || notFound;
    method(request, response);
};