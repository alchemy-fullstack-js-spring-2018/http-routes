const client = require('../lib/client-db');

const types = ['herbs', 'climber', 'creeper'];

const typePromises = types.map(type => {
    return client.query(
        `INSERT INTO type(name)'
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [type]
    );
});

Promise.all(typePromises)
    .then(() => {
        return client.query(
            `SELECT * FROM types`
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