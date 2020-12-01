const sequelize = require('../sequelize');
const { Model, DataTypes } = require('sequelize');
const Actor_Movie = require('./Actor_Movie');

class Actor extends Model { }
Actor.init ({
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
    modelName: 'actor',
    freezeTableName: true,
    timestamps: false
});

Actor.hasMany(Actor_Movie, {
    foreignKey: {
        name: 'actor_id',
        allowNull: false
    }
});
Actor_Movie.belongsTo(Actor);

Actor.sync();