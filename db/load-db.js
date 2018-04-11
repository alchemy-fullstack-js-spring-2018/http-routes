const client = require('../lib/db-client');

const bands = [
    {
        name: 'Preoccupations',
        city: 'Calgary'
    },
    {
        name: 'Shame',
        city: 'London'
    },
    {
        name: 'Ought',
        city: 'Montreal'
    }
];

const bandPromises = bands.map((name, city) => {
    return client.query(`
        INSERT INTO bands(name,city)
        VALUES($1,$2)
        ON CONFLICT DO NOTHING;
    `, [name, city]);
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