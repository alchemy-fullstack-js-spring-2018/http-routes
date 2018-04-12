const client = require('../db-client');

module.export = {

    showDoggos(){
        return client.query('SELECT * FROM doggos')
            .then(({ rows }) => rows);
    },

    showDoggo(name){
        return client.query(`
            SELECT * 
            FROM doggos
            WHERE name = $1;
        `,
        [name]
        ).then(({ rows }) => rows[0]);
    },

    addBorker(doggo){
        return client.query(`
            INSERT INTO doggos (
                name, breed, skill
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [doggo.name, doggo.breed, doggo.skill]
        ).then(({ rows }) => rows[0]);
    },

    updateBorker(id, doggo){
        return client.query(`
            UPDATE doggos 
            SET    
                name = $1, 
                breed = $2, 
                skill = $3,
            WHERE id = $4,
            RETURNING *;
        `,
        [doggo.name, doggo.breed, doggo.skill, id]
        ).then(({ rows }) => rows[0]);
    },

    deleteBorker(id){
        return client.query(`
            DELETE FROM doggos
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    },
};