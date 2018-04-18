require('dotenv').config({ path: 'test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('videogame test', () => {

    before(() => client.query('DELETE FROM videogames'));

    let armello = {
        name: 'Armello',
        category_id: 1,
        developer: 'League of Geeks'
    };

    let night = {
        name: 'Night in the Woods',
        category_id: 2,
        developer: 'Secret Lab'
    };

    before(() => {
        return chai.request(app)
            .post('/videogames')
            .send(armello)
            .then(({ body }) => {
                assert.equal(body.name, armello.name);
                assert.equal(body.category_id, armello.category_id);
                assert.equal(body.developer, armello.developer);
                armello = body;
            });
    });

    it('saves a videogame', () => {
        assert.ok(armello.id);
    });

    it('gets a videogame by id', () => {
        return chai.request(app)
            .get(`/videogames/${armello.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, armello);
            });

    });

    it('update a videogame', () => {
        armello.developer = 'League of Geeks';
        return chai.request(app)
            .put(`/pets/${armello.id}`)
            .send(armello)
            .then(({ body }) => {
                assert.deepEqual(body, armello);
            });

    });

    it('gets all videogames', () => {
        return chai.request(app)
            .post('/videogames')
            .send(night)
            .then(({ body }) => {
                night = body;
                return chai.request(app)
                    .get('/videogames');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [armello, night]);
            });

    });

    it('removes a pet', () => {
        return chai.request(app)
            .del(`/videogames/${night.id}`)
            .then(() => {
                return chai.request(app)
                    .get('/videogames');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [armello]);
            });
    });

    after(() => {
        client.end();
    });
});