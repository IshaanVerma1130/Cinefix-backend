const sequelize = require('../sequelize');
const { Model, DataTypes } = require('sequelize');
const Director_Movie = require('./Director_Movie');

class Director extends Model { }
Director.init({
    director_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    director_name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'director',
    freezeTableName: true,
    timestamps: false
});

Director.hasMany(Director_Movie, {
    foreignKey: {
        name: 'director_id',
        allowNull: false
    }
});
Director_Movie.belongsTo(Director);