/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const habitats = ['marine', 'terrestrial'];

const habitatPromises = habitats.map(habitat => {
    return client.query(
        `INSERT INTO habitat(name) 
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [habitat]
    );
});

Promise.all(habitatPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM habitat`
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
