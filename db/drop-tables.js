/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
  DROP TABLE invertebrates;
`)
    .then(
        () => console.log('successfullt dropped table'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });