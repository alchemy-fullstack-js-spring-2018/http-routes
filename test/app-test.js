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
        name: 'Testy-Os',
        genre: 'Test Pop',
        singer: 'La\'Testa Test'
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
                assert.deepEqual(body, testBand);
            });
    });

    it('gets all bands', () => {
        return chai.request(app)
            .post('/bands')
            .send(testBand2)
            .then(({ body }) => {
                testBand2 = body;
                return chai.request(app)
                    .get('/bands');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [testBand, testBand2]);
            });
            
    });

    it('update a band', () => {
        testBand2.singer = 'Terra Tester';
        return chai.request(app)
            .put(`/bands/${testBand2.id}`)
            .send(testBand2)
            .then(({ body }) => {
                assert.deepEqual(body, testBand2);
            });
    });

    it('removes a band', () => {
        return chai.request(app)
            .del(`/bands/${testBand.id}`)
            .then(() => {
                return chai.request(app)
                    .get('/bands');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [testBand2]);
            });
    });
        
    after(() => {
        client.end();
    });
});