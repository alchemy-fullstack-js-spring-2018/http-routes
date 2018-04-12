const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query('SELECT * FROM pokemons')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * FROM pokemons
            WHERE id = $1
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(pokemon) {
        return client.query(`
            INSERT INTO pokemons (
                name,
                type,
                pokedex_number
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [pokemon.name, pokemon.type, pokemon.pokedex_number]    
        ).then(({ rows }) => rows[0]);
    }, 
    update(pokemon) {
        return client.query(`
            UPDATE pokemons
            SET
                type = $1
            WHERE id = $2
            RETURNING *;
        `,
        [pokemon.type, pokemon.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM pokemons
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};