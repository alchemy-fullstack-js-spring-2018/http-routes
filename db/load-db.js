const client = require('../lib/db-client');

const podcasts = [{ name:'The Read', host: 'Kid Fury & Crissle', category:'Comedy' }, { name: 'She Explores', host: 'Gale Straub', category: 'Outdoor' }, { name: 'Welcome to Night Vale', host: 'Cecil Plamer', category: 'Comedy' }];

const podPromises = podcasts.map(podcast => {
    return client.query(
        `INSERT INTO podcasts(name, host, category)
        VALUES($1, $2, $3)
        ON CONFLICT DO NOTHING;`,
        [podcast.name, podcast.host, podcast.category]
    );
});

Promise.all(podPromises)
    .then(() => {
        return client.query(`
            SELECT * FROM podcasts;
        `);
    })
    .then(result => {
        console.log(result.row);
    })
    .then(
        () => console.log('DATABASE LOADED!'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });