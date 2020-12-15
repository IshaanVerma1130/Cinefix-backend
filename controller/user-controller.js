const Actor = require('../models/Actor');
const Actor_Movie = require('../models/Actor_Movie');
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');
const Director_Movie = require('../models/Director_Movie');
const { render } = require('ejs');

async function homePage(req, res) {
    if (req.session.user) {
        res.render('index.ejs', { navBar: './Nav-index-in', username: req.session.user.username });
    }
    else {
        res.render('index.ejs', { navBar: './Nav-index-out' });
    }
}

async function loginPage(req, res) {
    res.render('login.ejs');
}

async function signupPage(req, res) {
    res.render('signup.ejs');
}

// async function login(req, res) {
//     const password = req.body.password
//     const email = req.body.email

//     const user = await User.sequelize.query(
//         'SELECT * FROM User WHERE email = ? AND password = ?',
//         { replacements: [email, password], type: User.sequelize.QueryTypes.SELECT }
//     );

//     if (user[0]) {
//         req.session.user = user[0];
//         // console.log(req.session);
//         res.render('index.ejs', { navBar: './Nav-index-in', username: req.session.user.username })
//     }

//     else {
//         res.render("<h1>User doesn't exist. Please go back and try again.</h1>")
//     }
// }

async function logout(req, res) {
    delete req.session.user
    // console.log(req.session)
    res.render('index.ejs', { navBar: './Nav-index-out.ejs' })
}

// async function signup(req, res) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ status: 'error', errors: errors.array() });
//     }

//     const name = req.body.username
//     const email = req.body.email
//     const password = req.body.password

//     const user = await User.sequelize.query(
//         'SELECT * FROM User WHERE email = ? AND password = ? LIMIT 1',
//         { replacements: [email, password], type: User.sequelize.QueryTypes.SELECT }
//     );

//     console.log(user);
//     if (!user[0]) {
//         await User.sequelize.query(
//             'INSERT INTO User(username, email, password) VALUES (?, ?, ?)',
//             { replacements: [name, email, password], type: User.sequelize.QueryTypes.INSERT }
//         );

//         res.json({
//             "status": "Signed up successfully"
//         });
//     }

//     else {
//         res.json({
//             "status": "User already exists"
//         });
//     }
// }

async function giveReview(req, res) {
    const review = req.body.review
    const rating = req.body.rating
    const movie_id = req.params.id
    
    if (req.session.user) {
        const user_id = req.session.user.user_id
        await Review.sequelize.query(
            'INSERT INTO Review(user_id, movie_id, review, rating) VALUES (?, ?, ?, ?)',
            { replacements: [user_id, movie_id, review, rating], type: Review.sequelize.QueryTypes.INSERT }
        );
        res.redirect('http://localhost:3000/')
        // res.render('index.ejs', { navBar: './Nav-index-in.ejs', username: req.session.username });
    }
    else {
        res.redirect('http://localhost:3000/loginpage')
    }
}

async function selectMovie(req, res) {
    const movie_id = req.params.id

    const movies = await Movie.sequelize.query(
        'SELECT * FROM Movie WHERE movie_id = ?',
        { replacements: [movie_id], type: Movie.sequelize.QueryTypes.SELECT }
    );

    const actors = await Actor_Movie.sequelize.query(
        `SELECT actor_name FROM Actor WHERE actor_id in 
            (SELECT actor_id FROM Actor_Movie WHERE movie_id = ?)`,
        { replacements: [movie_id], type: Actor_Movie.sequelize.QueryTypes.SELECT }
    );

    const directors = await Director_Movie.sequelize.query(
        `SELECT director_name FROM Director WHERE director_id in 
            (SELECT director_id FROM Director_Movie WHERE movie_id = ?)`,
        { replacements: [movie_id], type: Director_Movie.sequelize.QueryTypes.SELECT }
    );

    const reviews = await Review.sequelize.query(
        `SELECT review, rating, username FROM Review LEFT JOIN User ON User.user_id = Review.user_id WHERE Review.movie_id = ?`,
        { replacements: [movie_id], type: Review.sequelize.QueryTypes.SELECT }
    );

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

module.exports = { giveReview, selectMovie, homePage, logout, loginPage, signupPage };