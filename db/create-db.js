/* eslint no-console: off, quotes: off */
const client = require('../lib/db-client');
client.query(`
  CREATE TABLE IF NOT EXISTS categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) UNIQUE NOT NULL
  );
  CREATE TABLE IF NOT EXISTS blazers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    school VARCHAR(256),
    category_id INTEGER NOT NULL REFERENCES categories(id),
    position VARCHAR(256)
  );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());