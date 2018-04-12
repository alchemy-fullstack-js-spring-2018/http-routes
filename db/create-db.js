/* eslint no-console: off */
const client = require('../lib/db-client');

client.query(`
  
  CREATE TABLE IF NOT EXISTS books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(256),
    author VARCHAR(256)
  );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());