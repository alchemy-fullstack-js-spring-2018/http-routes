'use strict';
/* eslint no-console: off, quotes: off */


const client = require('../lib/db-client');
const videogames = ['Armello', 'Night in the Woods', 'Undertale', 'Dragon Age'];

const videogamePromises = videogames.map(category => {
    return client.query(`
        INSERT INTO  videogames(name, developer)
        VALUES($1,$2)
    `,
    [category.name, category.developer]
    );

});

Promise.all(videogamePromises)
    .then(() => {

        client.query(
            `
        SELECT * FROM videogames
        `
        // [rawData.property1, rawData.property2]
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('Table successfully populated'),
        err => console.error(err))
    .then(
        () => client.end());