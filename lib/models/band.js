const client = require('../db-client');

module.exports = {
    
    selectAll() {
        return client.query('SELECT * FROM bands')
            .then(({ rows }) => rows);
    },

    selectOne(id) {
        return client.query(`
            SELECT * FROM bands
            WHERE id = $1;
        `, [id])
            .then(({ rows }) => rows[0]);
    }
};