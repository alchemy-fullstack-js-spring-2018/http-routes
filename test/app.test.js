require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('podcasts', () => {

    const allPods = [{ name:'The Read', host: 'Kid Fury & Crissle', category:'Comedy' }, { name: 'She Explores', host: 'Gale Straub', category: 'Outdoor' }, { name: 'Welcome to Night Vale', host: 'Cecil Plamer', category: 'Comedy' }];

    it('configured env', () => {
        assert.equal(process.env.DATABASE_URL,
            'postgres://localhost:5432/podcasts_test'
        );
    });

    it('gets all podcast', () => {
        return chai.request(app)
            .get('/podcasts')
            .then(({ body }) => {
                assert.ok(body);
            });
    });

    after(() => {
        client.end();
    });

});