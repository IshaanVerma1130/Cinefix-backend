const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor_Movie = require('../models/Actor_Movie');
const Genre_Movie = require('../models/Genre_Movie');
const userController = require('./user-controller');

async function searchByName(req, res) {
    const name = req.body.name

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE title LIKE '%${name}%'`,
        { type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json({ movies });
}

async function searchByActor(req, res) {
    const actor = req.body.actor

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE movie_id IN 
            (SELECT movie_id FROM Actor_Movie WHERE actor_id IN 
                (SELECT actor_id FROM Actor WHERE actor_name LIKE '%${actor}%'))`,
        { type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json({ movies });
}

async function searchByGenre(req, res) {
    const genre = req.body.genre

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE movie_id IN 
            (SELECT movie_id FROM Genre_Movie WHERE genre_id IN 
                (SELECT genre_id FROM Genre WHERE genre_name = ?))`,
        { replacements: [genre], type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json({ movies });
}

async function searchByYear(req, res) {
    const start_year = req.body.start
    const end_year = req.body.end

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE years <= ? and years > ?`,
        { replacements: [end_year, start_year], type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json({ movies });
}

async function searchByIMDB(req, res) {
    const imdb = req.body.imdb

    const movies = Movie.sequelize.query(
        `SELECT * FROM Movie WHERE imdb_rate >= ?`,
        { replacements: [imdb], type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json({ movies });
}

async function searchByURate(req, res) {
    const urate = req.body.urate

    const movies = Movie.sequelize.query(
        `SELECT * FROM Movie WHERE user_rate >= ?`,
        { replacements: [urate], type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json({ movies });
}

module.exports = {
    searchByName,
    searchByActor,
    searchByGenre,
    searchByYear,
    searchByIMDB,
    searchByURate
};