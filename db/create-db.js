const client = require('../lib/db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS habitat(
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) UNIQUE NOT NULL
  );
  CREATE TABLE IF NOT EXISTS invertebrates(
    id SERIAL PRIMARY KEY,
    orders VARCHAR(256),
    species VARCHAR(256),
    common_name VARCHAR(256),
    category_id INTEGER NOT NULL REFERENCES habitat(id),
    description VARCHAR(256)
  );
`)
    .then(
        () => console.log('tables successfully created'),
        err => console.error(err)
    )
    .then(() => client.end());