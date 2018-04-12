require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('podcasts', () => {

    before(() => client.query('DELETE FROM podcasts;'));
    
    const newPod = { 
        name:'The Read', 
        host: 'Kid Fury & Crissle', 
        category:'Comedy' 
    };
    let pod = null;

    before(() => {
        return chai.request(app)
            .post('/podcasts')
            .send(newPod)
            .then(({ body }) => {
                pod = body;
                assert.equal(pod.name, newPod.name);
                assert.equal(pod.host, newPod.host);
                assert.equal(pod.category, newPod.category);
            });
    });

    it('configured env', () => {
        assert.equal(process.env.DATABASE_URL,
            'postgres://localhost:5432/podcasts_test'
        );
    });

    it.skip('gets all podcasts', () => {
        return chai.request(app)
            .get('/podcasts')
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it('posts a podcast', () => {
        assert.ok(pod.id);
    });

    it('get a podcast by id', () => {
        return chai.request(app)
            .get(`/podcasts/${pod.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, pod);
            });
    });

    after(() => {
        client.end();
    });

});