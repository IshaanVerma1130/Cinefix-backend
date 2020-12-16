const { Model } = require('sequelize');
const sequelize = require('../connection');

class Actor_Movie extends Model { }
Actor_Movie.init({
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

module.exports = Actor_Movie;