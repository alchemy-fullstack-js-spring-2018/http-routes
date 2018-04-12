const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query('SELECT * FROM BANDS')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM BANDS
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(band) {
        return client.query(`
            INSERT INTO BANDS (
                name, genre, singer
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [band.name, band.genre, band.singer]
        ).then(({ rows }) => rows[0]);
    },
    update(band) {
        return client.query(`
            UPDATE BANDS
            SET    
                name = $1, 
                genre = $2, 
                singer = $3, 
            WHERE id = $1 
            RETURNING *;
        `,
        [band.name, band.genre, band.singer]
        ).then(({ rows }) => rows[0]);       
    },
    delete(id) {
        return client.query(`
            DELETE FROM BANDS
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);       
    }
};