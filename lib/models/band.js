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
    },

    insert(band) {
        return client.query(`
           INSERT INTO bands (name)
           VALUES ($1)
           RETURNING *;
        `, [band.name])
            .then(({ rows }) => rows[0]);
    },

    delete(id) {
        return client.query(`
            DELETE FROM bands
            WHERE id = $1;
        `, [id])
            .then(() => null);       
    },

    update(band, id) {
        return client.query(`
            UPDATE bands
            SET    
            name = $1 
            WHERE id = $2
            RETURNING *;
        `,
        [band.name, id])
            .then(({ rows }) => rows[0]);       
    },
};