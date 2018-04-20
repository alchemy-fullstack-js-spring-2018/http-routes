'use strict';
/* eslint no-console: off, quotes: off */


const client = require('../lib/db-client');
const videogames = ['videogames'];

// const videogames = [{ name:'Armello', developer:'League of Geeks' }, 
//     { name: 'Night in the Woods', developer:'Secret Lab' }, 
//     { name:'Undertale', developer:'Toby Fox' },
//     { name:'Dragon Age', developer:'Bioware' }]; 

const videogamePromises = videogames.map(category => {
    return client.query(`
        INSERT INTO videogames(name, developer)
        VALUES($1,$2)
        ON CONFLICT DO NOTHING`,
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