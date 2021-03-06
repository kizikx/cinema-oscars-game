const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MovieSchema = new Schema(
  {
    title: {type: String, required: true},
    realisator: {type: String, required: true},
    category: {type: String, required: true},
    duration: {type: String, required: true},
    country: {type: String, required: true},
    actors: [{
      name : {type: String, required: true},
      male : {type: Boolean, required: true}
      }],
    description: {type: String, required: true},
    gameId: {type: String, required: true}
  }
);

module.exports = mongoose.model('Movie', MovieSchema, "movie");