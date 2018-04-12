/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const categories = ['point guard', 'shooting guard', 'small forward', 'power forward', 'center'];

const categoryPromises = categories.map(category => {
    return client.query(
        `INSERT INTO categories(name) 
        VALUES($1)
        `,
        [category]
    );
});

Promise.all(categoryPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM categories`
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('load successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });