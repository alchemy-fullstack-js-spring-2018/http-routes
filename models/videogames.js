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
                name, developer, category_id
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [videogames.name, videogames.developer, videogames.category_id]
        ).then(({ rows }) => rows[0]);
    },
    update(videogames) {
        return client.query(`
            UPDATE videogames 
            SET    
                name = $1, 
                developer = $2, 
                category_id = $3, 
                WHERE id = $4
            RETURNING *;
        `,
        [videogames.name, videogames.developer, videogames.category_id, videogames.id]
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