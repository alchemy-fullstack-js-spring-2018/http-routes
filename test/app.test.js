require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');
const { assert } = chai;
chai.use(chaiHttp);

describe('Dogs', () => {

    before(() => client.query('DELETE FROM dogs'));

    after(() => {
        client.end();
    });

    let dawson = {
        breed: 'Husky',
        color: 'white/grey'
    };

    let beau = {
        breed: 'Golden Retriever',
        color: 'golden'
    };

    before(() => {
        return chai.request(app)
            .post('/dogs')
            .send(dawson)
            .then(({ body }) => {
                assert.equal(body.breed, dawson.breed);
                assert.equal(body.color, dawson.color);
                dawson = body;
            });       
    });

    it('saves a dog', () => {
        assert.ok(dawson.id);
    });

    it('gets id of dog', () => {
        return chai.request(app)
            .get(`/dogs/${dawson.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, dawson);
            });
    });

    it('updates breed of dog', () => {
        dawson.breed = 'pit';
        return chai.request(app)
            .put(`/dogs/${dawson.id}`)
            .send(dawson)
            .then(({ body }) => {
                assert.deepEqual(body, dawson);
            });
    });

    it('gets both dogs', () => {
        return chai.request(app)
            .post('/dogs')
            .send(beau)
            .then(({ body }) => {
                beau = body;
                return chai.request(app)
                    .get('/dogs');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [dawson, beau]);
            });
    });
});