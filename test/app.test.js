require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('birds', () => {

    before(() => client.query('DELETE FROM birds'));

    let hummingbird = {
        commonName: 'Anna\'s hummingbird',
        scientificName: 'Calypte anna',
        wingspan: '12 cm',
        diet: 'nectar',
        colors: ['green', 'gray', 'magenta']
    };

    let crow = {
        commonName: 'American crow',
        scientificName: 'Corvus brachyrhynchos',
        wingspan: '85–100 cm',
        diet: 'omnivorous',
        colors: ['black']
    };

    before(() => {
        return chai.request(app)
            .post('/birds')
            .send(hummingbird)
            .then(({ body }) => {
                hummingbird = body;
            });
    });

    it('saves a bird', () => {
        assert.ok(hummingbird.id);
    });

    after(() => {
        client.end();
    });
});