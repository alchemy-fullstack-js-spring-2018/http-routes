'use strict';

const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL_TEST || 'postgres://postgres:wastu3eg@localhost:5432/friends_test';

const pg = require('pg');
const Client = pg.Client;

const client = new Client(DATABASE_URL);

client.connect()
    .then(() => console.log('Connected to DB', DATABASE_URL))
    .catch(err => console.error('Connection error', err));

client.on('error', err => {
    
    console.error('\n**** DATABASE ERROR ****\n\n', err);
});

module.exports = client;