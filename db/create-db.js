const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS podcasts(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) UNIQUE NOT NULL,
        host VARCHAR(256),
        category VARCHAR(256),
    );
`)
    .then(
        () => console.log('DATABASE CREATED!'),
        err => console.error(err)
    )
    .then(() => client.end());