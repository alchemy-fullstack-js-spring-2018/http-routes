'use strict';

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NONE EXISTS videogames(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) UNIQUE NOT NULL,
        developer VARCHAR(256)
    );
    INSERT INTO videogames (title, developer) VALUES ('Armello', 'League of Geeks');
    INSERT INTO videogames (title, developer) VALUES ('Night in the Woods', 'Secret Lab');
`)
    .then(
        () => console.log('Table successfully created'),
        err => console.error(err)
    )
    .then(() => client.end());