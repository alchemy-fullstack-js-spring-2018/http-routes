const client = require('../lib/db-client');

client.query(`
    DROP TABLE IF EXISTS birds;
`)
    .then(
        /* eslint-disable no-console */
        () => console.log('drop succeeded'),
        err => console.error(err)
        /* eslint-enable no-console */
    )
    .then(() => {
        client.end();
    });