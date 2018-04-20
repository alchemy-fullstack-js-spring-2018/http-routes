const client = require('../lib/db-client');
module.exports = {
    selectAll() {
        return client.query('SELECT * FROM videogames')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM videogames
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(videogames) {
        return client.query(`
            INSERT INTO videogames (
                name, developer
            )
            VALUES ($1, $2)
            RETURNING *;
        `,
        [videogames.name, videogames.developer]
        ).then(({ rows }) => rows[0]);
    },
    update(videogames) {
        return client.query(`
            UPDATE videogames 
            SET    
                name = $1, 
                developer = $2 
                WHERE id = $3
            RETURNING *;
        `,
        [videogames.name, videogames.developer, videogames.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM videogames
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};