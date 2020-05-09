const mongoose = require('mongoose');

const Game = require('../models/gameModel');

//Create a game
module.exports.createGame = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Game content can not be empty"
        });
    }
    let gameId = Math.random().toString(36).substr(2, 9);
    const game = new Game({
      gameId: generateGameId(),
      players: req.body.players,
      catagories: req.body.catagories,
      ongoing: true
    });
  
    game.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Game."
        });
    });
};

function generateGameId(){
    let gameId = Math.random().toString(36).substr(2, 9);
    return gameId;
}

// get a game by id
module.exports.getGameById = (req, res) => {
    Game.findOne(
      {gameId:req.params.gameId})
    .then(game => {
        if(!game) {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });            
        }
        res.send(game);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving game with id " + req.params.gameId
        });
    });
};
  
  //get all games
module.exports.getGame = (req, res) => {
    Game.find()
    .then(game => {
        res.send(game);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving games."
        });
    });
};

//update a shoe
module.exports.updateGame = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Game content can not be empty"
        })
    }
  
    Game.findOne({gameId: req.params.id}, (err, foundObject) => {
      if (req.body.ongoing !== undefined) {
        foundObject.ongoing = req.body.ongoing;
      }
      foundObject.save((err, updatedObject) => {
          if (err) {
              res.status(400).send({
                  erreur: err.message
              })
          } else {
              res.status(200).send(updatedObject)
          }
      })
    })
};