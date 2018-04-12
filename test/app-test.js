require('dotenv').config({ path: 'test/.env.test' });
const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');

const { assert } = chai;
chai.use(chaiHttp);

describe('E2E', () => {

    before(() => client.query('DELETE FROM bands'));

    let testBand = {
        name: 'Bat For Lashes',
        genre: 'Dreampop',
        singer: 'Natasha Khan'
    };

    it('test', () => {
        return chai.request(app)
            .post('/bands')
            .send(testBand)
            .then(({ body }) => {
                assert.equal(body.name, testBand.genre);
            });       
    });

    after(() => {
        client.end();
    });

});