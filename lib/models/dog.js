const client = require('../db-client');

module.exports = {

    insert(dog) {
        return client.query(`
            INSERT INTO DOGS (
                breed, color
            )
            VALUES ($1, $2)
            RETURNING *;
        `,
        [dog.breed, dog.color]
        ).then(({ rows }) => rows[0]);
    },

    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM DOGS
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
};