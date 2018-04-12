'use strict';

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS breeds(
        ID SERIAL PRIMARY KEY NOT NULL,
        NAME varchar(20) UNIQUE NOT NULL,
        DESCRIPTION varchar(160) NOT NULL
    )
`).then(
    () => console.log('Breeds successfully created'),
    err => console.error(err)
);

client.query(`
    CREATE TABLE IF NOT EXISTS doggos(
    ID SERIAL PRIMARY KEY NOT NULL,
    NAME varchar(15) UNIQUE NOT NULL,
    BREED_ID int REFERENCES breeds(ID),
    SKILL varchar(100) NOT NULL
    )
`).then(
    () => console.log('Doggos successfully created'),
    err => console.error(err)
).then(() => client.end());