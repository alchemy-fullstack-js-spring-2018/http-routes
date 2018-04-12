const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('Bands', () => {

    it('Gets all bands', () => {
        return chai.request(app)
            .get('/bands')
            .then(({ body }) => {
                assert.deepEqual(body, [{ id: 1, name: 'Preoccupations' },
                    { id: 2, name: 'Shame' },
                    { id: 3, name: 'Ought' }]);
            });
    });

    it('Gets one band', () => {
        return chai.request(app)
            .get('/bands/3')
            .then(({ body }) => {
                assert.deepEqual(body, { id: 3, name: 'Ought' });
            });
    });



    after(() => {
        client.end();
    });

});