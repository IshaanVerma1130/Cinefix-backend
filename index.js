const Express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');
const { body, validationResult } = require("express-validator");
const User = require('./models/User');

const app = Express();
app.use(Express.json());
app.use(bodyParser.urlencoded({extended: true}));

const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
  host: process.env.host,
  dialect: 'mysql'
});

// Check if connection to db was established.
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.post('/login', async (res, req) => {
  // const name = req.body.username
  const password = req.body.password
  const email = req.body.email
  
  const user = await User.sequelize.query(
    `SELECT CASE WHEN EXISTS 
      (SELECT * FROM User WHERE (email = ? and password = ?)) 
    THEN CAST(1 AS BIT)   
    ELSE CAST(0 AS BIT) 
    END`,
    {replacements: [email, password], type: User.sequelize.QueryType.SELECT}
  );

  if (user === 1){
    
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));