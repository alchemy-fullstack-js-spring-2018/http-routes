const client = require('../lib/db-client');

client.query(`
    DROP TABLE pokemons;
`)
    .then(
        () => console.log('drop successful'), //eslint-disable-line
        err => console.error(err) //eslint-disable-line
    )
    .then(() => client.end());