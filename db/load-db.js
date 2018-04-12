const client = require('../lib/db-client');

client.query(`
    SELECT * FROM pokemons
`)
    .then(result => console.log(result.rows))

    .then(
        () => console.log('load successful'), 
        err => console.error(err))
        
    .then(() => client.end());