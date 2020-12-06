const { Model, DataTypes } = require('sequelize');
const Review = require('./Review');
const Director_Movie = require('./Director_Movie');
const Actor_Movie = require('./Actor_Movie');
const Genre_Movie = require('./Genre_Movie');
const sequelize = require('../connection');

class Movie extends Model { }
Movie.init({
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    user_rate: {
        type: DataTypes.INTEGER
    },
    imdb_rate: {
        type: DataTypes.DECIMAL(4, 2)
    },
    years: {
        type: DataTypes.INTEGER
    },
    img_url: {
        type: DataTypes.STRING
    },
    plot: {
        type: DataTypes.STRING
    },
    runtime: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

// 1:m from Movie to Actor_Movie
Movie.hasMany(Actor_Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});
Actor_Movie.belongsTo(Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});

// 1:m from Movie to Review
Movie.hasMany(Review, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});
Review.belongsTo(Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});

// 1:m from Movie to Director_Movie
Movie.hasMany(Director_Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});
Director_Movie.belongsTo(Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});

// 1:m from Movie to Genre_Movie
Movie.hasMany(Genre_Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});
Genre_Movie.belongsTo(Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});

module.exports = Movie;