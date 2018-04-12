require('dotenv').config({ path: './test/.env' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);


describe('breeds', () => {

    before(() => client.query(`
        DELETE FROM breeds WHERE name='loaf'; `));

    let loaf = {
        name: 'loaf',
        description: `no legs, all bread, don't care`
    };
    let loaf = {
        name: 'loaf',
        description: `no legs, all bread, don't care`
    };

    before(() => {
        return chai.request(app)
            .post('/breeds')
            .send(loaf)
            .then(({ body }) => {
                assert.equal(body.name, loaf.name);
                assert.equal(body.description, loaf.description);
                loaf = body;
            });
    });

    it('saves a pet', () => {
        assert.ok(loaf.id);
    });

    it('gets a pet by id', () => {
        return chai.request(app)
            .get(`/breeds/${loaf.name}`)
            .then(({ body }) => {
                assert.deepEqual(body, loaf);
            });
    });

    it('update a pet', () => {
        loaf.description = 'your mom';
        return chai.request(app)
            .put(`/breeds/${loaf.id}`)
            .send(loaf)
            .then(({ body }) => {
                assert.deepEqual(body, loaf);
            });
    });

    it('gets all pets', () => {
        return chai.request(app)
            .post('/breeds')
            .send(garfield)
            .then(({ body }) => {
                garfield = body;
                return chai.request(app)
                    .get('/pets');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [duchess, garfield]);
            });
    });

    // it('removes a pet', () => {
    //     return chai.request(app)
    //         .del(`/pets/${garfield.id}`)
    //         .then(() => {
    //             return chai.request(app)
    //                 .get('/pets');
    //         })
    //         .then(({ body }) => {
    //             assert.deepEqual(body, [duchess]);
    //         });
    // });

    after(() => {
        client.end();
    });
});