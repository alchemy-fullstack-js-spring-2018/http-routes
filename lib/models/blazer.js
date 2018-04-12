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
        ).then(({ rows }) => rows[0]);
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
    },
    update(blazer) {
        return client.query(`
            UPDATE BLAZERS
            SET
                name = $1,
                school = $2,
                category_id = $3,
                position = $4
            WHERE id = $5
            RETURNING *;
            `,
        [blazer.name, blazer.school, blazer.category_id, blazer.position, blazer.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM BLAZERS
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};