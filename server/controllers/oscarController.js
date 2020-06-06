const mongoose = require('mongoose');

const Oscar = require('../models/oscarModel');

module.exports.createOscar = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "oscar content can not be empty"
        });
    }
    const oscar = new Oscar({
        gameId: req.params.gameId,
        name: req.body.name,
        description: req.body.description
    });
  
    oscar.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the oscar."
        });
    });
};



// get a game by id
module.exports.getOscarById = (req, res) => {
    Oscar.findOne(
      {_id:req.params.oscarId})
    .then(oscar => {
        if(!oscar) {
            return res.status(404).send({
                message: "Oscar not found with id " + req.params.oscarId
            });            
        }
        res.send(oscar);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Oscar not found with id " + req.params.oscarId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving oscar with id " + req.params.oscarId
        });
    });
};
  
  //get all games
module.exports.getOscars = (req, res) => {
    Oscar.find(
        {gameId:req.params.gameId})
    .then(oscar => {
        res.send(oscar);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving oscars."
        });
    });
};

module.exports.addVote = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Oscar content can not be empty"
        })
    }
    
    Oscar.updateOne(
        {_id: req.params.oscarId},
        { $addToSet: { votes: req.body.votes } },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
};
