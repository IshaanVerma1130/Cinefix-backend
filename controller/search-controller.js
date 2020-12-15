const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor_Movie = require('../models/Actor_Movie');
const Genre_Movie = require('../models/Genre_Movie');
const Director_Movie = require('../models/Director_Movie');
const Review = require('../models/Review');

async function searchByName(req, res) {
    const name = req.body.name

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE title LIKE '%${name}%'`,
        { type: Movie.sequelize.QueryTypes.SELECT }
    );
    //console.log(movies)
    if (movies.length == 1) {

        const actors = await Actor_Movie.sequelize.query(
            `SELECT actor_name FROM Actor WHERE actor_id in 
            (SELECT actor_id FROM Actor_Movie where movie_id =
                (SELECT movie_id FROM Movie WHERE Movie.title LIKE '%${name}%'))`,
            { type: Actor_Movie.sequelize.QueryTypes.SELECT }
        );

        // console.log(actors)
        const directors = await Director_Movie.sequelize.query(
            `SELECT director_name FROM Director WHERE director_id in 
            (SELECT director_id FROM Director_Movie where movie_id =
                (SELECT movie_id FROM Movie WHERE Movie.title LIKE '%${name}%'))`,
            { type: Director_Movie.sequelize.QueryTypes.SELECT }
        );

        const reviews = await Review.sequelize.query(
            `SELECT review, rating, username FROM Review LEFT JOIN User ON User.user_id = Review.user_id WHERE Review.movie_id = 
                (SELECT movie_id FROM Movie WHERE title LIKE '%${name}%')`,
            { type:Review.sequelize.QueryTypes.SELECT }
            
        );
        console.log(reviews);
        const hours = Math.floor(movies[0].runtime / 60)
        const minutes = movies[0].runtime - (60 * hours)
        const runtime = { hours: hours, minutes: minutes }

        if (req.session.user) {
            res.render('Display-movie.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, reviews: reviews, movies: movies, actors: actors, directors: directors, runtime: runtime });
        }

        else {
            res.render('Display-movie.ejs', { navBar: './Nav-bar-out', reviews: reviews, movies: movies, actors: actors, directors: directors, runtime: runtime });
        }

    }
    else {

        if (req.session.user) {
            res.render('Movie-list.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, movies: movies });
        }
        else {
            res.render('Movie-list.ejs', { navBar: './Nav-bar-out', movies: movies });
        }
    }
}

async function searchByActor(req, res) {
    const actor = req.params.name

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE movie_id IN 
            (SELECT movie_id FROM Actor_Movie WHERE actor_id IN 
                (SELECT actor_id FROM Actor WHERE actor_name LIKE '%${actor}%'))`,
        { type: Movie.sequelize.QueryTypes.SELECT }
    );

    if (req.session.user) {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, movies: movies });
    }
    else {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-out', movies: movies });
    }
}

async function searchByDirector(req, res) {
    const director = req.params.name

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE movie_id IN 
            (SELECT movie_id FROM Director_Movie WHERE director_id IN 
                (SELECT director_id FROM Director WHERE director_name LIKE '%${director}%'))`,
        { type: Movie.sequelize.QueryTypes.SELECT }
    );

    if (req.session.user) {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, movies: movies });
    }
    else {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-out', movies: movies });
    }
}

async function searchByGenre(req, res) {
    const genre = req.params.id

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE movie_id IN 
            (SELECT movie_id FROM Genre_Movie WHERE genre_id IN 
                (SELECT genre_id FROM Genre WHERE genre_name = ?))`,
        { replacements: [genre], type: Movie.sequelize.QueryTypes.SELECT }
    );
    // console.log(movies);
    if (req.session.user) {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, movies: movies });
    }
    else {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-out', movies: movies });
    }
}

async function searchByYear(req, res) {
    const start_year = req.params.start
    const end_year = req.params.end

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE years <= ? and years > ?`,
        { replacements: [end_year, start_year], type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json({ movies });
}

async function searchByIMDB(req, res) {
    const from = req.params.from
    const to = req.params.to

    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie WHERE imdb_rate >= ? and imdb_rate < ?`,
        { replacements: [from, to], type: Movie.sequelize.QueryTypes.SELECT }
    );
    console.log(movies)

    if (req.session.user) {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, movies: movies });
    }
    else {
        res.render('Movie-list.ejs', { navBar: './Nav-bar-out', movies: movies });
    }
}

async function searchIMDB(req, res) {
    if (req.session.user) {
        res.render('by-imdb.ejs', { navBar: './Nav-bar-in', username: req.session.user.username });
    }
    else {
        res.render('by-imdb.ejs', { navBar: './Nav-bar-out' });
    }
}

async function searchByURate(req, res) {
    const movies = await Movie.sequelize.query(
        `SELECT * FROM Movie ORDER BY user_rate DESC`,
        { type: Movie.sequelize.QueryTypes.SELECT }
    );

    if (req.session.user) {
        res.render('by-urate.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, movies: movies });
    }
    else {
        res.render('by-urate.ejs', { navBar: './Nav-bar-out', movies: movies });
    }
}

async function showActors(req, res) {
    const actors = await Actor.sequelize.query(
        `SELECT actor_name FROM Actor ORDER BY actor_name ASC`,
        { type: Actor.sequelize.QueryTypes.SELECT }
    );

    const list = { type: "Actors", array: actors }
    //console.log(list)

    if (req.session.user) {
        res.render('by-actor-director.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, list: list });
    }
    else {
        res.render('by-actor-director.ejs', { navBar: './Nav-bar-out', list: list });
    }
}

async function showDirectors(req, res) {
    const directors = await Director.sequelize.query(
        `SELECT director_name FROM Director ORDER BY director_name ASC`,
        { type: Director.sequelize.QueryTypes.SELECT }
    );

    const list = { type: "Directors", array: directors }

    if (req.session.user) {
        // console.log(req.session)
        res.render('by-actor-director.ejs', { navBar: './Nav-bar-in', username: req.session.user.username, list: list });
    }
    else {
        res.render('by-actor-director.ejs', { navBar: './Nav-bar-out', list: list });
    }
}

module.exports = {
    searchByName,
    searchByActor,
    searchByGenre,
    searchByYear,
    searchByIMDB,
    searchByURate,
    searchByDirector,
    showActors,
    showDirectors,
    searchIMDB
};