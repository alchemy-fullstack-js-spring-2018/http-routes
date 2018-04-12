const client = require('../lib/db-client');

module.exports = {

    dropTable() {
        client.query(`
    DROP TABLE IF EXISTS bands;
`)
            .then(
                () => console.log('Drop Successful'),
                err => console.error(err)
            );
    },

    createTable() {
        client.query(`
    CREATE TABLE IF NOT EXISTS bands(
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) UNIQUE NOT NULL
    );
`)
            .then(
                () => console.log('DB Task Successful'),
                err => console.error(err)
            );
    },

    loadTable() {
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
            );
    }

};