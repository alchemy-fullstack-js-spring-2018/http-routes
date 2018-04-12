require('dotenv').config({ path: '.test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('blazers', () => {
    before(() => client.query('DELETE FROM blazers'));

    let lillard = {
        name: 'Damian Lillard',
        category_id: 1,
        school: 'Weber State',
        position: 'Point Guard'
    };

    let mccollum = {
        name: 'CJ McCollum',
        category_id: 2,
        school: 'Lehigh University',
        position: 'Point Guard'
    };

    before(() => {
        return chai.request(app)
            .post('/blazers')
            .send(lillard)
            .then(({ body }) => {
                assert.equal(body.name, lillard.name);
                assert.equal(body.category_id, lillard.category_id);
                assert.equal(body.school, lillard.school);
                assert.equal(body.position, lillard.position);
                lillard = body;
            });
    });

    it('saves a player', () => {
        console.log('lillard id', lillard.id);
        assert.ok(lillard.id);
    });

    it('gets a player by id', () => {
        return chai.request(app)
            .get(`/blazers/${lillard.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, lillard);
            });
    });

    after(() => {
        client.end();
    });

});