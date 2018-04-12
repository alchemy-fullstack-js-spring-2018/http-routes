const client = require('../db-client');

module.exports = {
    
    selectAll() {
        return client.query('SELECT * FROM bands')
            .then(({ rows }) => rows);
    }
    
};