const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let GameSchema = new Schema(
  {
    players: [String],
    categories: [{
      name: {type: String},
      description: {type: String}
    }],
    ongoing: {type: Boolean, required: true}
  }
);

module.exports = mongoose.model('Game', GameSchema, "game");