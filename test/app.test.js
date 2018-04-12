require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('podcasts', () => {

    const newPod = { 
        name:'The Read', 
        host: 'Kid Fury & Crissle', 
        category:'Comedy' 
    };


    before(() => client.query('DELETE FROM podcasts;'));

    it('configured env', () => {
        assert.equal(process.env.DATABASE_URL,
            'postgres://localhost:5432/podcasts_test'
        );
    });

    it('gets all podcasts', () => {
        return chai.request(app)
            .get('/podcasts')
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it.only('posts a podcast', () => {
        return chai.request(app)
            .post('/podcasts')
            .send(newPod)
            .then(({ body }) => {
                assert.ok(body.id);
            });
    });

    after(() => {
        client.end();
    });

});