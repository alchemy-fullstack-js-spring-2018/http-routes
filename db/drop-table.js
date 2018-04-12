const client = require('../lib/db-client');

client.query(`
    DROP TABLE IF EXISTS bands;
`)
    .then(
        () => console.log('Drop Successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });
