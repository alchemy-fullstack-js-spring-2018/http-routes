const client = require('../lib/db-client');

const bands = ['Preoccupations', 'Shame', 'Ought'];


const bandPromises = bands.map(band => {
    return client.query(`
        INSERT INTO bands(name)
        VALUES($1)
    `, [band]);
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