const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PlayerSchema = new Schema(
  {
    name: {type: String, required: true},
    admin: {type: Boolean, required: true},
    gameId: {type: String, required: true},
    categories: {
      name: {type: String},
      description: {type: String},
      sent: {type: Boolean}
    },
    aVote: {type: Boolean, required: true},
  }
);

module.exports = mongoose.model('Player', PlayerSchema, "player");