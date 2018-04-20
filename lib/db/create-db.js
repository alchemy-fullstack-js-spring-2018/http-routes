/* eslint no-console: off */
const client = require('../lib/db-client');

client.query(`
  
  CREATE TABLE IF NOT EXISTS dogs(
    id SERIAL PRIMARY KEY,
    title VARCHAR(256),
    author VARCHAR(256)
  );
`)
    .then(
        () => console.log('database task successful'),
        err => console.error(err)
    )
    .then(() => client.end());