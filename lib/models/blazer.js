const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query('SELECT * FROM BLAZERS')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT *
            FROM BLAZERS
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows);
    },
    insert(blazer) {
        return client.query(`
            INSERT INTO BLAZERS (
                name, school, category_id, position
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
        [blazer.name, blazer.school, blazer.category_id, blazer.position]
        ).then(({ rows }) => rows[0]);
    }
}