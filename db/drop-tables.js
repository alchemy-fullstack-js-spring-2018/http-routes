const client = require('../lib/db-client');

client.query(`
    DROP TABLE podcasts;
    );
`)
    .then(
        () => console.log('DATABASE DROPPED!'),
        err => console.error(err)
    )
    .then(() => client.end());