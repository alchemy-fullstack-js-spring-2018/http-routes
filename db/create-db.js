const client = require('../lib/client-db');

client.query(`

    CREATE TABLE IF NOT EXISTS plants(
        Id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        type VARCHAR(100),
        category_id INTEGER NOT NULL REFERENCES categories(id),
        description VARCHAR(200),
        
    );
`)
    .then(
        () => console.log('db task succesful'),
        err => console.error(err)
    )
    .then(() => client.end());

