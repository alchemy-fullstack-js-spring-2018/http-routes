'use strict';

const client = require('../lib/db-client');
const friends = require('../data/friends');

const friendPromises = friends.map(friend => {
    return client.query(
        `
        INSERT INTO friends(
            name, role
        )
        VALUES ($1, $2);
        `,
        [friend.name, friend.role]
    );
});

Promise.all(friendPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM friends`
        );
    })
    .then(
        result => {console.log(result.rows);}
    )
    .then(
        () => console.log('Table successfully populated'),
        err => console.error(err))
    .then(
        () => client.end());