const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query('SELECT * FROM podcasts')
            .then(({ rows }) => rows);
    },

    selectOne(id) {
        return client.query(`
        SELECT * FROM podcasts
        WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },

    insert(podcast) {
        return client.query(`
        INSERT INTO podcasts (
            name, host, category
        )
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [podcast.name, podcast.host, podcast.category]
        ).then(({ rows }) => rows[0]);
    },

    delete(podcast) {
        return client.query(`
        DELETE FROM podcasts
        WHERE id = $1;
        `,
        [podcast.id]
        ).then(({ rows }) => rows[0]);
    }
};