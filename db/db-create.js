
const client = require('../lib/db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS bands(
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) UNIQUE NOT NULL,
    genre VARCHAR(256) UNIQUE NOT NULL,
    singer VARCHAR(256) NOT NULL
  );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());