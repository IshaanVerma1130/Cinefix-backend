const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

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
    freezeTableName: true,
    timestamps: false
});

module.exports = Review;