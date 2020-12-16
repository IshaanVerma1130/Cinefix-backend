const Express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const { body, validationResult } = require("express-validator");
const userController = require('./controller/user-controller');
const searchController = require('./controller/search-controller');
const User = require('./models/User');

const sequelize = require('./connection');
sequelize.sync();

const app = Express();
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(Express.static(__dirname + '/views'))
app.use(session({ secret: 'a0b1c9d8', saveUninitialized: false, resave: false }));

app.get('/', userController.homePage);
app.get('/loginpage', userController.loginPage);
app.get('/logout', userController.logout);
app.get('/signuppage', userController.signupPage);
app.get('/select/movie/:id', userController.selectMovie);
app.post('/search/name', searchController.searchByName);
app.get('/search/actor/:name', searchController.searchByActor);
app.get('/search/director/:name', searchController.searchByDirector);
app.get('/search/genre/:id', searchController.searchByGenre);
app.post('/search/year', searchController.searchByYear);
app.get('/search/imdb', searchController.searchIMDB);
app.get('/search/imdb/:from/:to', searchController.searchByIMDB);
app.get('/search/urate', searchController.searchByURate);
app.get('/search/actors', searchController.showActors);
app.get('/search/directors', searchController.showDirectors);
app.post('/review/:id', userController.giveReview);

app.post('/signup', [
    // username must not be empty
    body('username')
        .notEmpty().withMessage('Name must not be empty')
        .isLength({ min: 6 }).withMessage('Name must be 6 characters long'),
    // email must be an valid email
    body('email')
        .isEmail().withMessage('Enter a valid email'),
    // password must be at least 5 chars long
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be 8 characters long')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const name = req.body.username
    const email = req.body.email
    const password = req.body.password

    const user = await User.sequelize.query(
        'SELECT * FROM User WHERE email = ? AND password = ? LIMIT 1',
        { replacements: [email, password], type: User.sequelize.QueryTypes.SELECT }
    );

    // console.log(user);
    if (!user[0]) {
        await User.sequelize.query(
            'INSERT INTO User(username, email, password) VALUES (?, ?, ?)',
            { replacements: [name, email, password], type: User.sequelize.QueryTypes.INSERT }
        );

        res.render('login.ejs')
    }

    else {
        res.render("<h1>User already exists. Please go back and try again.</h1>")
    }
});

app.post('/login', [
    body('email')
        .isEmail().withMessage('Enter a valid email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Name must be 8 characters long')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const password = req.body.password
    const email = req.body.email

    const user = await User.sequelize.query(
        'SELECT * FROM User WHERE email = ? AND password = ?',
        { replacements: [email, password], type: User.sequelize.QueryTypes.SELECT }
    );

    if (user[0]) {
        req.session.user = user[0];
        // console.log(req.session);
        res.render('index.ejs', { navBar: './Nav-index-in', username: req.session.user.username })
    }

    else {
        res.render("<h1>User doesn't exist. Please go back and try again.</h1>")
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));