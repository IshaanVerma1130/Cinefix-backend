const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Genre_Movie = require('./Genre_Movie');

class Genre extends Model { }
Genre.init({
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    genre_name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

// 1:m from Genre to Genre_Movie
Genre.hasMany(Genre_Movie, {
    foreignKey: {
        name: 'genre_id',
        allowNull: false
    }
});
Genre_Movie.belongsTo(Genre, {
    foreignKey: {
        name: 'genre_id',
        allowNull: false
    }
});

module.exports = Genre;

