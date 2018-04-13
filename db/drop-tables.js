/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
  DROP TABLE IF EXISTS invertebrates;
  DROP TABLE IF EXISTS habitat;
`)
    .then(
        () => console.log('successfully dropped table'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });