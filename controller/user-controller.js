const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');

async function login(req, res) {
    const password = req.body.password
    const email = req.body.email

    const user = await User.sequelize.query(
        'SELECT * FROM User WHERE email = ? AND password = ?',
        { replacements: [email, password], type: User.sequelize.QueryTypes.SELECT }
    );

    if (user[0]) {
        res.json({user});
    }

    else {
        res.json({
            status: "User doesnot exist"
        });
    }
}

async function signup(req, res) {
    const name = req.body.username
    const email = req.body.email
    const password = req.body.password

    const user = await User.sequelize.query(
        'SELECT * FROM User WHERE email = ? AND password = ? LIMIT 1',
        { replacements: [email, password], type: User.sequelize.QueryTypes.SELECT }
    );

    console.log(user);
    if (!user[0]) {
        await User.sequelize.query(
            'INSERT INTO User(username, email, password) VALUES (?, ?, ?)',
            { replacements: [name, email, password], type: User.sequelize.QueryTypes.INSERT }
        );

        res.json({
            "status": "Signed up successfully"
        });
    }

    else {
        res.json({
            "status": "User already exists"
        });
    }
}

async function giveReview(req, res) {
    const review = req.body.review
    const user_id = req.body.user_id
    const rating = req.body.rating

    await Review.sequelize.query(
        'INSERT INTO Review(user_id, review, rating) VALUES (?, ?, ?)',
        { replacements: [user_id, review, rating], type: Review.sequelize.QueryTypes.INSERT }
    );

    res.json("Review given successfully"); 
}

async function selectMovie(req, res) {
    const movie_id = req.body.movie_id

    const movie = Movie.sequelize.query(
        'SELECT * FROM Movie WHERE movie_id = ?',
        { replacements: [movie_id], type: Movie.sequelize.QueryTypes.SELECT }
    );

    res.json(movie);
}

module.exports = { login, signup, giveReview, selectMovie };