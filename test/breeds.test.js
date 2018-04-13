require('dotenv').config({ path: './test/.env' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);


describe('breeds', () => {

    before(() => client.query(`
        ALTER TABLE breeds DISABLE TRIGGER ALL;
        DELETE FROM breeds
        WHERE (name = 'long boi' OR name = 'loaf');
        ALTER TABLE breeds ENABLE TRIGGER ALL;`));

    let loaf = {
        name: 'loaf',
        description: `no legs, all bread, don't care`
    };
    let longBoi = {
        name: 'long boi',
        description: `got stretched`
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

    it('saves a breed', () => {
        assert.ok(loaf.id);
    });

    it('gets a breed by id', () => {
        return chai.request(app)
            .get(`/breeds/${loaf.name}`)
            .then(({ body }) => {
                assert.deepEqual(body, loaf);
            });
    });

    it('update a breed', () => {
        loaf.description = 'your mom';
        return chai.request(app)
            .put(`/breeds/${loaf.id}`)
            .send(loaf)
            .then(({ body }) => {
                assert.deepEqual(body, loaf);
            });
    });

    it('gets all breeds', () => {
        return chai.request(app)
            .post('/breeds')
            .send(longBoi)
            .then(({ body }) => {
                longBoi = body;
                return chai.request(app)
                    .get('/breeds');
            })
            .then(({ body }) => {
                assert.deepInclude(body, longBoi);
            });
    });

    it('removes a breed', () => {
        return chai.request(app)
            .del(`/breeds/${longBoi.id}`)
            .then(() => {
                return chai.request(app)
                    .get('/breeds');
            })
            .then(({ body }) => {
                assert.notDeepInclude(body, longBoi);
            });
    });

});