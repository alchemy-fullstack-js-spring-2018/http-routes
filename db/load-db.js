const client = require('../lib/db-client');

client.query(`
    SELECT * FROM pokemons
`)
    .then(result => console.log(result.rows)) //eslint-disable-line

    .then(
        () => console.log('load successful'), //eslint-disable-line 
        err => console.error(err)) //eslint-disable-line
        
    .then(() => client.end());