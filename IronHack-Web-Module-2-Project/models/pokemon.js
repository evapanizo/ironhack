// Packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definition of the Schema
const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

// Definition of the Model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Export the model
module.exports = Pokemon;
