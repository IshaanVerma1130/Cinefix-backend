const { Model, DataTypes } = require('sequelize');
const Review = require('./Review');
const sequelize = require('../connection');

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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

// 1:m from User to Review
User.hasMany(Review, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});
Review.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});

module.exports = User;