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

    let testBand2 = {
        name: 'Testy and the Tests',
        genre: 'Test Rock',
        singer: 'Tessa Tester'
    };

    before(() => {
        return chai.request(app)
            .post('/bands')
            .send(testBand)
            .then(({ body }) => {
                assert.equal(body.name, testBand.name);
                assert.equal(body.genre, testBand.genre);
                assert.equal(body.singer, testBand.singer);
                testBand = body;
            });       
    });

    it('gets single band by id', () => {
        return chai.request(app)
            .get(`/bands/${testBand.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, testBand2);
            });

    });

    after(() => {
        client.end();
    });

});