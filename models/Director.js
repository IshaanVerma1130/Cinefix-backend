const { Model, DataTypes } = require("sequelize");
const sequelize = require('../connection');
const Director_Movie = require('./Director_Movie');

class Director extends Model { }
Director.init({
    director_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    director_name: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

// 1:m from Director to Dirtector_Movie
Director.hasMany(Director_Movie, {
    foreignKey: {
        name: 'director_id',
        allowNull: false
    }
});
Director_Movie.belongsTo(Director, {
    foreignKey: {
        name: 'director_id',
        allowNull: false
    }
});

module.exports = Director;
