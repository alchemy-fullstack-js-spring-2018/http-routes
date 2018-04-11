'use strict';

const client = require('../db/db-client');
const rawData = require(/* raw data, json */);

Promise.all(books.map(book => {
    return client.query(
        `
        INSERT INTO /* table */(
            /* column one */, /* column two */
        )
        VALUES ($1, $2);
        `,
        [rawData.property1, rawData.property2]
    );
}))
    .then(
        () => console.log('Table successfully populated'),
        err => console.error(err))
    .then(
        () => client.end());