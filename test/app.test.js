require('dotenv').config({ path: './test/.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('books', () => {

    before(() => client.query('DELETE FROM books'));

    after(() => {
        client.end();
    });

    let misery = {
        title: 'Misery',
        author: 'Stephen King'
    };

    let deadZone = {
        title: 'The Dead Zone',
        author: 'Stephen King'
    };

    before(() => {
        return chai.request(app)
            .post('/books')
            .send(misery)
            .then(({ body }) => {
                assert.equal(body.title, misery.title);
                assert.equal(body.author, misery.author);
                misery = body;
            });       
    });

    it('saves a pet', () => {
        assert.ok(misery.id);
    });

    it('book by id', () => {
        return chai.request(app)
            .get(`/books/${misery.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, misery);
            });
    });

    it('updates book', () => {
        misery.author = 'King';
        return chai.request(app)
            .put(`/books/${misery.id}`)
            .send(misery)
            .then(({ body }) => {
                assert.deepEqual(body, misery);
            });
    });




});