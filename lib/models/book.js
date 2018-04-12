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
    }
};