const client = require('../lib/db-client');
const { bands } = require('../lib/data/band-list');

const bandPromises = bands.map(bands => {
    return client.query(
        `INSERT INTO bands(name, genre, singer)
            VALUES($1, $2, $3)
            ON CONFLICT DO NOTHING;`,
        [bands.name, bands.genre, bands.singer]
    );
});    
Promise.all(bandPromises)
    .then(() => {
        return client.query(
            'SELECT * FROM bands;'
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('load successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });