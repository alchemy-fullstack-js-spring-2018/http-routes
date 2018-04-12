module.exports = (req, res) => {
    res.statusCode = 404;
    res.end({
        error:true,
        message: `Path ${req.url} not found`
    });
};