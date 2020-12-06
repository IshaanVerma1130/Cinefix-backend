const { Model } = require('sequelize');
const sequelize = require('../connection');

class Director_Movie extends Model { }
Director_Movie.init({
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

module.exports = Director_Movie;