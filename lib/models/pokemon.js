const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query('SELECT * FROM pokemons')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT FROM pokemons
            WHERE id = $1
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    }
};