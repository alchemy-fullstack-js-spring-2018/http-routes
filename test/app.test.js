const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('Friends Tests', () => {
    before(() => client.query('DELETE FROM friends'));

    let austin = {
        name: 'Austin',
        role: 'Literally everything good about us.'
    };

    // let kasey = {
    //     name: 'Kasey',
    //     role: 'Setting a low bar for the rest of us.'
    // };

    before(() => {
        return chai.request(app)
            .post('/friends')
            .send(austin)
            .then(({ body }) => {
                assert.equal(body.name, austin.name);
                assert.equal(body.role, austin.role);
                austin = body;
            });
    });

});