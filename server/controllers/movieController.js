const mongoose = require('mongoose');

const Movie = require('../models/movieModel');

//Create a move
module.exports.createMovie = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Game content can not be empty"
        });
    }
    const movie = new Movie({
        title: req.body.title,
        realisator: req.body.realisator,
        category: req.body.category,
        duration: req.body.duration,
        country: req.body.country,
        actors: req.body.actors,
        description: req.body.description,
        gameId: req.params.gameId
    });
  
    movie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the movie."
        });
    });
};

// get a movie by id
module.exports.getMovieById = (req, res) => {
    Movie.findOne(
      {_id:req.params.movieId})
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });            
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.movieId
        });
    });
};

  //get all movies
  module.exports.getMoviesByGame = (req, res) => {
    Movie.find({gameId: req.params.gameId})
    .then(movie => {
        console.log(movie);
        res.send(movie);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving movies."
        });
    });
};
  
  //get all movies
module.exports.getMovies = (req, res) => {
    Movie.find()
    .then(movie => {
        res.send(movie);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving movies."
        });
    });
};