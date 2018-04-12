module.exports = (req, res) => {
    res.statusCode = 404;
    res.end(`404 - Cannot ${req.method} ${req.url}`);
};