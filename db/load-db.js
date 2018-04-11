const client = require('../lib/db-client');

const podcasts = ['The Read', 'She Explores', 'Welcome to Night Vale'];

const podPromises = podcasts.map(podcast => {
    return client.query(
        `INSERT INTO podcasts(name)
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [podcast]
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