/* eslint no-console: off */
const client = require('../lib/db-client');

client.query(`
  
  CREATE TABLE IF NOT EXISTS dogs(
    id SERIAL PRIMARY KEY,
    breed VARCHAR(256),
    color VARCHAR(256)
  );
`)
    .then(
        () => console.log('database task successful'),
        err => console.error(err)
    )
    .then(() => client.end());