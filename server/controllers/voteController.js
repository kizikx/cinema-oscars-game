const mongoose = require('mongoose');

const Vote = require('../models/voteModel');

module.exports.createVote = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "vote content can not be empty"
        });
    }
    const vote = new Vote({
      name: req.body.name,
      playerId: req.params.playerId,
      gameId: req.params.gameId
    });
  
    vote.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the vote."
        });
    });
};

// get a game by id
module.exports.getVoteById = (req, res) => {
    Vote.findOne(
      {_id:req.params.voteId})
    .then(vote => {
        if(!vote) {
            return res.status(404).send({
                message: "Vote not found with id " + req.params.voteId
            });            
        }
        res.send(vote);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Vote not found with id " + req.params.voteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving vote with id " + req.params.voteId
        });
    });
};
  
  //get all games
module.exports.getVotes = (req, res) => {
    Vote.find(
        {gameId:req.params.gameId})
    .then(vote => {
        res.send(vote);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving votes."
        });
    });
};
