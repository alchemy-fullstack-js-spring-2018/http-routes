// const podcasts = require('./routes/podcasts');

// const routes = {
//     __proto__: null,
//     podcasts
// };

module.exports = (req, res) => {
    if(req.url === '/') {
        req.end('hello world');
    }
};