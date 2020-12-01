const sequelize = require('../sequelize');
const { Model, DataTypes } = require('sequelize');
const Review = require('./Review');

class User extends Model { }
User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING ,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: false
});

User.hasMany(Review, {
    foreignKey: {
        name: user_id,
        allowNull: false
    }
});
Review.belongsTo(User);

module.exports = User;