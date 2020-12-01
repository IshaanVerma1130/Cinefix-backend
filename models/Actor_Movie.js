const sequelize = require('../sequelize');
const { Model } = require('sequelize');

class Actor_Movie extends Model { }
Actor_Movie.init({
}, {
    sequelize,
    modelName: 'actor_movie',
    freezeTableName: true,
    timestamps: false
});

Actor_Movie.sync();

module.exports = Actor_Movie;