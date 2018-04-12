const client = require('../db-client');

module.export = {

    showBreeds(){
        return client.query('SELECT * FROM breeds')
            .then(({ rows }) => rows);
    },

    showBreed(name){
        return client.query(`
            SELECT * 
            FROM breeds
            WHERE name = $1;
        `,
        [name]
        ).then(({ rows }) => rows[0]);
    },
    
    addBreed(breed){
        return client.query(`
            INSERT INTO breeds (
                name, description
            )
            VALUES ($1, $2)
            RETURNING *;
        `,
        [breed.name, breed.description]
        ).then(({ rows }) => rows[0]);
    },

    updateBreed(id, breed){
        return client.query(`
            UPDATE breeds 
            SET    
                name = $1, 
                description = $2, 
            WHERE id = $3,
            RETURNING *;
        `,
        [breed.name, breed.description, id]
        ).then(({ rows }) => rows[0]);
    },

    deleteBreed(id){
        return client.query(`
            DELETE FROM breeds
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    },
};