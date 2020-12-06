const Express = require("express");
const bodyParser = require('body-parser');
// const { body, validationResult } = require("express-validator");
const userController = require('./controller/user-controller');
const searchController = require('./controller/search-controller');

const sequelize = require('./connection');
sequelize.sync();

const app = Express();
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.post('/login', userController.login);
app.post('/signup', userController.signup);
app.get('/search/name', searchController.searchByName);
app.get('/search/actor', searchController.searchByActor);
app.get('/search/genre', searchController.searchByGenre);
app.get('/search/year', searchController.searchByYear);
app.get('/search/imdb', searchController.searchByIMDB);
app.get('/search/urate', searchController.searchByURate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));