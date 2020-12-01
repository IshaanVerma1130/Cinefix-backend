const sequelize = require('../sequelize');
const { Model } = require('sequelize');

class Genre_Movie extends Model { }
Genre_Movie.init({
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

Genre_Movie.sync();

module.exports = Genre_Movie;