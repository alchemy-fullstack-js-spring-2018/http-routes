
module.exports = (req, res) => {
    res.statusCode = 404;
    res.end({
        error: true,
        message: `Sorry ${req.url} not found`
    });
};