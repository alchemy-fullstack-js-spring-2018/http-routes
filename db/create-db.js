'use strict';

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS /* table name */(
        /* column name */ /* data type */ NOT NULL,
        /* second column name */ /* data type */ NOT NULL
    )
`).then(
    () => console.log('Table successfully created'),
    err => console.error(err)
).then(() => client.end());