const client = require('../lib/db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS habitat(
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) UNIQUE NOT NULL
  );
  INSERT INTO habitat (name) VALUES ('marine');
  INSERT INTO habitat (name) VALUES ('terrestrial');
  CREATE TABLE IF NOT EXISTS invertebrates(
    id SERIAL PRIMARY KEY,
    ord VARCHAR(256),
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