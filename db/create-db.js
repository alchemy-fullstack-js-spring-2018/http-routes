'use strict';

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NONE EXISTS videogames(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) UNIQUE NOT NULL
    );
`)
    .then(
        () => console.log('Table successfully created'),
        err => console.error(err)
    )
    .then(() => client.end());