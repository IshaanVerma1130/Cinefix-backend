const sequelize = require('../sequelize');
const { Model, DataTypes } = require('sequelize');
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

Genre.hasMany(Genre_Movie, {
    foreignKey: {
        name: 'genre_id',
        allowNull: false
    }
});
Genre_Movie.belongsTo(Genre);