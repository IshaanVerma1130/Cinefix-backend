const { Model, DataTypes } = require('sequelize');
const Actor_Movie = require('./Actor_Movie');
const sequelize = require('../connection');

class Actor extends Model { }
Actor.init({
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    actor_name: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

// 1:m from Actor to Actor_Movie
Actor.hasMany(Actor_Movie, {
    foreignKey: {
        name: 'actor_id',
        allowNull: false
    }
});
Actor_Movie.belongsTo(Actor, {
    foreignKey: {
        name: 'actor_id',
        allowNull: false
    }
});

module.exports = Actor;