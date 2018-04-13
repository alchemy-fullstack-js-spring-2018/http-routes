const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query('SELECT * FROM invertebrates')
            .then(({ rows }) => rows);
    },

    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM invertebrates 
            WHERE id = $1
            `, [id]
        ).then(({ rows }) => rows[0]);
    },

    insert(invert) {
        return client.query(`
            INSERT INTO invertebrates (
                ord, common_name, category_id, description
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
        [invert.ord, invert.common_name, invert.category_id, invert.description]
        ).then(({ rows }) => rows[0]);
    },

    update(invert) {
        return client.query(`
            UPDATE invertebrates 
            SET    
                name = $1, 
                color = $2, 
                category_id = $3, 
                description = $4
            RETURNING *;
        `,
        [invert.ord, invert.common_name, invert.category_id, invert.description]
        ).then(({ rows }) => rows[0]);       
    },
    delete(id) {
        return client.query(`
            DELETE FROM invertebrates
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);       
    }
};