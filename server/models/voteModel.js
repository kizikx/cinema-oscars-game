const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let VoteSchema = new Schema(
  {
    gameId: {type: String, required: true},
    playerId: {type: Boolean, required: true},
    name: {type: String, required: true}
  }
);

module.exports = mongoose.model('Vote', VoteSchema, "vote");