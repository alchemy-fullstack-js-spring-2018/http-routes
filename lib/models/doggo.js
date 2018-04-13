const client = require('../db-client');

module.exports = {

    showDoggos(){
        return client.query('SELECT * FROM doggos')
            .then(({ rows }) => rows);
    },

    showDoggo(id){
        return client.query(`
            SELECT * 
            FROM doggos
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },

    addBorker(doggo){
        return client.query(`
            INSERT INTO doggos (
                name, skill, breed_id
            )
            VALUES ($1, $2, (SELECT id FROM breeds WHERE name=$3 ))
            RETURNING *;
        `,
        [doggo.name, doggo.skill, doggo.breed]
        ).then(({ rows }) => rows[0]);
    },

    updateBorker(doggo){
        return client.query(`
            UPDATE doggos 
            SET name = $1, 
                skill = $2,
                breed_id = (SELECT id from breeds WHERE name = $3)
            WHERE id = $4
            RETURNING *;
        `,
        [doggo.name, doggo.skill, doggo.breed, doggo.id]
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