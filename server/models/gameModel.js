const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let GameSchema = new Schema(
  {
    gameId: {type: String, required: true, unique: true},
    players: [String],
    categories: [String],
    ongoing: {type: Boolean, required: true}
  }
);

module.exports = mongoose.model('Game', GameSchema, "game");