const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');
const table = require('../db/db-all');

const { assert } = chai;
chai.use(chaiHttp);

describe('Bands', () => {

    before(() => {
        table.dropTable();
        table.createTable();
        table.loadTable();
    });

    it('GET all bands', () => {
        return chai.request(app)
            .get('/bands')
            .then(({ body }) => {
                assert.deepEqual(body, [{ id: 1, name: 'Preoccupations' },
                    { id: 2, name: 'Shame' },
                    { id: 3, name: 'Ought' }]);
            });
    });

    it('GET one band', () => {
        return chai.request(app)
            .get('/bands/3')
            .then(({ body }) => {
                assert.deepEqual(body, { id: 3, name: 'Ought' });
            });
    });

    it('POST a band', () => {
        return chai.request(app)
            .post('/bands')
            .send({ name: 'Iceage' })
            .then(({ body }) => {
                assert.equal(body.name, 'Iceage');
            });
    });

    it('DELETE a band', () => {
        return chai.request(app)
            .del('/bands/4')
            .then(() => {
                return chai.request(app)
                    .get('/bands');
            })
            .then(({ body }) => {
                assert.deepEqual(body.length, 3);
            });
    });

    it('PUT/update a band', () => {
        return chai.request(app)
            .put('/bands/2')
            .send({ name: 'Shame from London' })
            .then(({ body }) => {
                assert.deepEqual(body.name, 'Shame from London');
            });
    });

    it('GET - 404 error', () => {
        return chai.request(app)
            .get('/wherever')
            .then(res => {
                assert.equal(res.statusCode, 404);
            });
    });

    after(() => {
        client.end();
    });

});