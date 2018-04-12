require('dotenv').config({ path: '../.env' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('pokemans', () => {

    before(() => client.query('DELETE FROM pokemons'));

    let bulb = {
        name: 'Bulbasaur',
        type: 'Grass',
        pokedex_number: 1
    };

    let char = {
        name: 'Charmander',
        type: 'Fire',
        pokedex_number: 4
    };

    before(() => {
        return chai.request(app)
            .post('/pokemons')
            .send(bulb)
            .then(({ body }) => {
                assert.equal(body.name, bulb.name);
                assert.equal(body.type, bulb.type);
                assert.equal(body.pokedex_number, bulb.pokedex_number);
                bulb = body;
            });
    });

    it('saves a pokemon', () => {
        assert.ok(bulb.id);
    });

    it('gets a pokemon by id', () => {
        return chai.request(app)
            .get(`/pokemons/${bulb.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, bulb);
            });
    });

    it('updates a pokemon', () => {
        bulb.type = 'Grass/Poison';
        return chai.request(app)
            .put(`/pokemons/${bulb.id}`)
            .send(bulb)
            .then(({ body }) => {
                assert.deepEqual(body, bulb);
            });
    });

    it('gets all pokemon', () => {
        return chai.request(app)
            .post('/pokemons')
            .send(char)
            .then(({ body }) => {
                char = body;
                return chai.request(app)
                    .get('/pokemons');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [bulb, char]);
            });
    });

    it('deletes a pokemon', () => {
        return chai.request(app)
            .del(`/pokemons/${char.id}`)
            .then(() => {
                return chai.request(app)
                    .get('/pokemons');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [bulb]);
            });
    });

    after(() => {
        client.end();
    });

});