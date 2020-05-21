const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PlayerSchema = new Schema(
  {
    name: {type: String, required: true},
    admin: {type: Boolean, required: true},
    gameId: {type: String, required: true},
    category: {
      name: {type: String},
      description: {type: String}
    },
  }
);

module.exports = mongoose.model('Player', PlayerSchema, "player");