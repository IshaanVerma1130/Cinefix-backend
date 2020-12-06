const { Model } = require('sequelize');
const sequelize = require('../connection');

class Genre_Movie extends Model { }
Genre_Movie.init({
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

module.exports = Genre_Movie;