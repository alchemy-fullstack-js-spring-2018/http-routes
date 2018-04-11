'use strict';

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS friends(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) NOT NULL,
        role TEXT NOT NULL
    )
`).then(
    () => console.log('Table successfully created'),
    err => console.error(err)
).then(() => client.end());