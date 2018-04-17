'use strict';

const client = require('../lib/db-client');

client.query(`
DROP TABLE IF EXISTS videogames,
;
`)
    .then(
        () => console.log('All tables successfully removed'),
        err => console.error(err)
    )

    .then(() => client.end());