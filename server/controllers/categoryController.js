const mongoose = require('mongoose');

//const Category = require('../models/categoryModel');

//Create a Category
module.exports.createCategory = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    const category = new Category({
      name: req.body.name,
      description: req.body.description
    });
  
    category.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the category."
        });
    });
};

// get a game by id
module.exports.getCategoryById = (req, res) => {
    Category.findOne(
      {_id:req.params.id})
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });            
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving category with id " + req.params.id
        });
    });
};
  
  //get all games
module.exports.getCategory = (req, res) => {
    Category.find()
    .then(category => {
        res.send(category);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categories."
        });
    });
};