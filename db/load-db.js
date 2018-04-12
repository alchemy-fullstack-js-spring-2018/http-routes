'use strict';

const client = require('../lib/db-client');
const { breeds, doggos } = require('./api/doggos.json');

Promise.all(breeds.map(breed => {
    return client.query(
        `
        INSERT INTO breeds(name, description)
        VALUES ($1, $2);
        `,
        [breed.name, breed.description]
    );
}))
    .then(
        () => console.log('Breeds successfully populated'),
        err => console.error(err));

Promise.all(doggos.map(doggo => {
    return client.query(
        `
        INSERT INTO doggos(name, breed, skill)
        VALUES ($1, $2, $3);
            `,
        [doggo.name, doggo.breed, doggo.skill]
    );
}))
    .then(
        () => console.log('Doggos successfully populated'),
        err => console.error(err))
    .then(
        () => client.end());