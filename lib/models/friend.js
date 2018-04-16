'use strict';

const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query(`SELECT * FROM friends`)
            .then(({ rows }) => rows);
    },

    selectOne(id) {
        return client.query(`
        SELECT *
        FROM friends
        WHERE id = $1
        `,
        [id])
            .then(({ rows }) => rows[0]);
    },

    insert(friend) {
        return client.query(`
            INSERT INTO friends (name, role)
            VALUES ($1, $2)
            RETURNING *;
        `,
        [friend.name, friend.role]
        ).then(({ rows }) => rows[0]);
    },

    update(friend) {
        return client.query(`
            UPDATE friends
            SET name = $1, role = $2
            WHERE id = $3
            RETURNING *;
        `,
        [friend.name, friend.role, friend.id])
            .then(({ rows }) => rows[0]);
    },

    delete(id) {
        return client.query(`
            DELETE FROM friends
            WHERE id = $1
        `,
        [id]
        ).then(() => null);
    }
};