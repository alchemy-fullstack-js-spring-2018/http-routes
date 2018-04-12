const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('podcasts', () => {
    it('hello world', () => {
        return chai.request(app)
            .get('/')
            .then(response => {
                assert.equal(response.text, 'hellow world');
            });
    });
});