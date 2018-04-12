require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');
const { assert } = chai;
chai.use(chaiHttp);

describe('Invertebrates', () => {

    before(() => client.query('DELETE FROM invertebrates'));

    let pycnogonid = {
        ord: 'Pantopoda',
        common_name: 'sea spiders',
        category_id: 1
    };

    let pseudoscorpion = {
        ord: 'Pseudoscorpiones',
        common_name: 'false scorpion, book scorpion',
        category_id: 2
    };

    before(() => {
        return chai.request(app)
            .post('/invertebrates')
            .send(pycnogonid)
            .then(({ body }) => {
                assert.equal(body.ord, pycnogonid.ord);
                assert.equal(body.common_name, pycnogonid.common_name);
                assert.equal(body.category_id, pycnogonid.category_id);
                pycnogonid = body;
            });
    });

    it('saves an invertebrate', () => {
        assert.ok(pycnogonid.id);
    });

    it('saves an additional invertebrate, returns all upon req', () => {
        return chai.request(app)
            .post('/invertebrates')
            .send(pseudoscorpion)
            .then(({ body }) => {
                pseudoscorpion = body;
                return chai.request(app)
                    .get('/invertebrates');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [pycnogonid, pseudoscorpion]);
            });
    });

    it('gets an invert by id', () => {
        return chai.request(app)
            .get(`/invertebrates/${pycnogonid.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, pycnogonid);
            });
    });

    it('removes an invertebrate', () => {
        return chai.request(app)
            .del(`/invertebrates/${pseudoscorpion.id}`)
            .then(() => {
                return chai.request(app)
                    .get('/invertebrates');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [pycnogonid]);
            });
    });
});
