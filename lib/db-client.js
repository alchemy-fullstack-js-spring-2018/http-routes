const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/bands';

const pg = require('pg');
const Client = pg.Client;

const client = new Client(DATABASE_URL);

client.connect()
    .then(() => console.log('Connected to DB', DATABASE_URL))
    .catch(err => console.error('Connection Error', err));

client.on('error', err => {
    console.error('DATABASE ERROR', err);
});

module.exports = client;