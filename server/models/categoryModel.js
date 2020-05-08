const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true}
  }
);

module.exports = mongoose.model('CategorySchema', CategorySchema, "categorySchema");