require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');
const { assert } = chai;
chai.use(chaiHttp);

describe('Dogs', () => {

    // before(() => client.query('DELETE FROM dogs'));

    after(() => {
        client.end();
    });

    let dawson = {
        breed: 'Husky',
        color: 'white/grey'
    };

    // let beau = {
    //     breed: 'Golden Retriever',
    //     color: 'golden'
    // };

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
});