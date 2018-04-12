const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/pokemon';

const pg = require('pg');
const Client = pg.Client;

const client = new Client(DATABASE_URL);
client.connect()
    .then(() => console.log('connected to db', DATABASE_URL)) //eslint-disable-line
    .catch(err => console.error('connection error', err)); //eslint-disable-line

client.on('error', err => {
    console.error('\n**** DATABASE ERROR ****\n\n', err); //eslint-disable-line
});  

module.exports = client; 