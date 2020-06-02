const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let OscarSchema = new Schema(
  {
    gameId: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    votes: [{type: String}]
  }
);

module.exports = mongoose.model('Oscar', OscarSchema, "oscar");