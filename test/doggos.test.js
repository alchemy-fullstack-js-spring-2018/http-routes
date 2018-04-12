require('dotenv').config({ path: './test/.env' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);


describe('doggos', () => {

    before(() => client.query(`DELETE FROM doggos;`));

    let latte = {
        name: 'latte',
        breed: 'smoosh',
        skill: 'sitting like a hooman'
    };

    let bubdow = {
        name: 'bubdow',
        breed: 'pibble',
        skill: 'being a punk'
    };

    before(() => {
        return chai.request(app)
            .post('/doggos')
            .send(latte)
            .then(({ body }) => {
                assert.equal(body.name, latte.name);
                assert.equal(body.skill, latte.skill);
                latte = body;
            });
    });

    it('saves a pet', () => {
        assert.ok(latte.id);
    });

    it('gets a pet by id', () => {
        return chai.request(app)
            .get(`/doggos/${latte.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, latte);
            });
    });

    it.skip('update a pet', () => {
        latte.description = 'we miss latte';
        return chai.request(app)
            .put(`/doggos/${latte.id}`)
            .send(latte)
            .then(({ body }) => {
                assert.deepEqual(body, latte);
            });
    });

    it('gets all pets', () => {
        return chai.request(app)
            .post('/doggos')
            .send(bubdow)
            .then(({ body }) => {
                bubdow = body;
                return chai.request(app)
                    .get('/doggos');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [latte, bubdow]);
            });
    });

    it('removes a pet', () => {
        return chai.request(app)
            .del(`/doggos/${bubdow.id}`)
            .then(() => {
                return chai.request(app)
                    .get('/doggos');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [latte]);
            });
    });

    after(() => {
        client.end();
    });
});