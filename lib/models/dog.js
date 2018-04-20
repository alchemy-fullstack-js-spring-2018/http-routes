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

    update(id, body){
        return client.query(`
            UPDATE DOGS
            SET
                breed = $1,
                color = $2
            WHERE id = $3
            RETURNING *
        `,
        [body.breed, body.color, id]
        ).then(({ rows }) => rows[0]);
    },

    selectAll(){
        return client.query('SELECT * FROM DOGS')
            .then(({ rows }) => rows);
    },
};