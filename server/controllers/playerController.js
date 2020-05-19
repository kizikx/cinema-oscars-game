const mongoose = require('mongoose');

const Player = require('../models/playerModel');

//Create a player
module.exports.createPlayer = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Game content can not be empty"
        });
    }
    const player = new Player({
      name: req.body.name,
      admin: req.body.catagories,
      gameId: req.params.gameId
    });
  
    player.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the player."
        });
    });
};

// get a game by id
module.exports.getPlayerById = (req, res) => {
    Player.findOne(
      {_id:req.params.playerId})
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });            
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving game with id " + req.params.playerId
        });
    });
};
  
module.exports.updatePlayer = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Game content can not be empty"
        })
    }
  
    Player.findOne({_id: req.params.playerId}, (err, foundObject) => {
      if (req.body.catagories !== undefined) {
        foundObject.catagories.push(req.body.catagories);
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

