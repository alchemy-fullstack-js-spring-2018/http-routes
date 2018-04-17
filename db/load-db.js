'use strict';

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

Promise.all(books.map(book => {
    return client.query(
        `
        INSERT INTO /* table */(
            /* column one */, /* column two */
        )
        VALUES ($1, $2);
        `,
        [rawData.property1, rawData.property2]
    );
}))
    .then(
        () => console.log('Table successfully populated'),
        err => console.error(err))
    .then(
        () => client.end());