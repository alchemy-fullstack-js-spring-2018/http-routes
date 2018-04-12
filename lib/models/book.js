const client = require('../db-client');

module.exports = {

    insert(book) {
        return client.query(`
            INSERT INTO BOOKS (
                title, author
            )
            VALUES ($1, $2)
            RETURNING *;
        `,
        [book.title, book.author]
        ).then(({ rows }) => rows[0]);
    },

    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM BOOKS
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },

    update(id, body){
        return client.query(`
            UPDATE BOOKS
            SET
                title = $1,
                author = $2
            WHERE id = $3
            RETURNING *
        `,
        [body.title, body.author, id]
        ).then(({ rows }) => rows[0]);
    }
};