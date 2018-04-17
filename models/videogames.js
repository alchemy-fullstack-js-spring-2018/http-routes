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
                title, developer, category_id
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [videogames.title, videogames.developer, videogames.category_id]
        ).then(({ rows }) => rows[0]);
    },
    update(videogames) {
        return client.query(`
            UPDATE videogames 
            SET    
                title = $1, 
                developer = $2, 
                category_id = $3, 
            RETURNING *;
        `,
        [videogames.name, videogames.color, videogames.category_id, videogames.description]
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