const Express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
// const { body, validationResult } = require("express-validator");
const userController = require('./controller/user-controller');
const searchController = require('./controller/search-controller');

const sequelize = require('./connection');
sequelize.sync();

const app = Express();
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(Express.static(__dirname + '/views'))
app.use(session({ secret: 'a0b1c9d8', saveUninitialized: false, resave: false }));

app.post('/login', userController.login);
app.post('/signup', userController.signup);
app.post('/search/name', searchController.searchByName);
app.post('/search/actor', searchController.searchByActor);
app.get('/search/genre/:id', searchController.searchByGenre);
app.post('/search/year', searchController.searchByYear);
app.post('/search/imdb', searchController.searchByIMDB);
app.post('/search/urate', searchController.searchByURate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));