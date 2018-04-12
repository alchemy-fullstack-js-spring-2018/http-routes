const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS pokemons(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(256) UNIQUE NOT NULL,
        type VARCHAR(256) UNIQUE NOT NULL,
        pokedex_number INTEGER NOT NULL
    );
`)
    .then(() => console.log('db task successful'), err => console.error(err)) //eslint-disable-line
    .then(() => client.end());