const client = require('../db-client');

module.exports = {
    selectAll() {
        return client.query(
            `SELECT id, common_name AS "commonName", scientific_name AS "scientificName", wingspan, diet, colors FROM birds
            ORDER BY "scientificName";`
        )
            .then(({ rows }) => rows);
    },

    selectOne(id) {
        return client.query(
            `SELECT id, common_name AS "commonName", scientific_name AS "scientificName", wingspan, diet, colors FROM birds
            WHERE id = $1;`,
            [id]
        )
            .then(({ rows }) => rows[0]);
    },

    insert(bird) {
        return client.query(
            `INSERT INTO birds (common_name, scientific_name, wingspan, diet, colors)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, common_name AS "commonName", scientific_name AS "scientificName", wingspan, diet, colors;`,
            [bird.commonName, bird.scientificName, bird.wingspan, bird.diet, bird.colors]
        )
            .then(({ rows }) => rows[0]);
    },

    update(bird) {
        return client.query(
            `UPDATE birds
            SET common_name = $1,
                scientific_name = $2,
                wingspan = $3,
                diet = $4,
                colors = $5
            WHERE id = $6
            RETURNING id, common_name AS "commonName", scientific_name AS "scientificName", wingspan, diet, colors;`,
            [bird.commonName, bird.scientificName, bird.wingspan, bird.diet, bird.colors, bird.id]
        )
            .then(({ rows }) => rows[0]);
    },

    delete(id) {
        return client.query(
            `DELETE FROM birds
            WHERE id = $1;`,
            [id]
        )
            .then(() => null);
    }
};