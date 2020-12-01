const sequelize = require('../sequelize');
const { Model } = require('sequelize');

class Director_Movie extends Model { }
Director_Movie.init({
}, {
    sequelize,
    modelName: 'director_movie',
    freezeTableName: true,
    timestamps: false
});

Director_Movie.sync();

module.exports = Director_Movie;