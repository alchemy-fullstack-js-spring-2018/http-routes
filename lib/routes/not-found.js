module.exports = (request, response) => {
    response.statusCode = 404;
    response.end(JSON.stringify({
        error: true,
        message: `Cannot ${request.method} ${request.url}`
    }));
};