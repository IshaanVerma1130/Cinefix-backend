const User = require('../models/User');

async function login(req, res) {
    const password = req.body.password
    const email = req.body.email

    const user = await User.sequelize.query(
        'SELECT * FROM User WHERE email = ? AND password = ?',
        { replacements: [email, password], type: User.sequelize.QueryTypes.SELECT }
    );

    if (user[0]) {
        res.json({ user });
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
        )

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

// async function giveReview(req, res) {
//     const review = req.body.review
    
// }

module.exports = { login, signup };