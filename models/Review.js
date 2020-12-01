const sequelize = require('../sequelize');
const { Model, DataTypes } = require('sequelize');
const Movie = require('./Movie');

class Review extends Model{ }
Review.init({
    review: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'review',
    freezeTableName: true,
    timestamps: false
});

Review.sync();

module.exports = Review;