const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS bands(
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) UNIQUE NOT NULL,
    city VARCHAR(256)
    );
`)
    .then(
        () => console.log('DB Task Successful'),
        err => console.error(err)
    )
    .then(() => client.end());