const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS birds(
        id SERIAL PRIMARY KEY,
        common_name VARCHAR(256)
        scientific_name VARCHAR(256)
        wingspan VARCHAR(256)
        diet VARCHAR(256)
        colors VARCHAR(256)[]
    );
`)
    .then(
        /* eslint-disable no-console */
        () => console.log('table created'),
        err => console.error(err)
        /* eslint-enable no-console */
    )
    .then(() => client.end());