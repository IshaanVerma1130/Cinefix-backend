const sequelize = require('../sequelize');
const { Model, DataTypes } = require('sequelize');
const Director_Movie = require('./Director_Movie');
const Genre_Movie = require('./Genre_Movie');
const Actor_Movie = require('./Actor_Movie');
const Review = require('./Review');

class Movies extends Model { }
Movies.init({
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
        type: DataTypes.DECIMAL(4,2)
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
    modelName: 'movie',
    freezeTableName: true,
    timestamps: false
});

Movies.hasMany(Genre_Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});
Genre_Movie.belongsTo(Movies);

Movies.hasMany(Actor_Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});
Actor_Movie.belongsTo(Movies);

Movies.hasMany(Director_Movie, {
    foreignKey: {
        name: 'movie_id',
        allowNull: false
    }
});
Director_Movie.belongsTo(Movies);

Movie.hasMany(Review, {
    foreignKey: {
        name: movie_id,
        allowNull: false
    }
});
Review.belongsTo(Movie);


