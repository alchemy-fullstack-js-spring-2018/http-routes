module.exports = (req, res) => {
    res.statusCode = 404;
    res.end({
        error: true,
        message: `Cannon ${req.method} ${req.url}`
    });
};