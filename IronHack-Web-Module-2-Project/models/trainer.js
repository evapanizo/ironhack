// Packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Definition of the Schema
const trainerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  telegram: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  myPokemon: [{
    type: ObjectId,
    ref: 'Pokemon'
  }],
  wishList: [{
    type: ObjectId,
    ref: 'Pokemon'
  }]
});

// Definition of the Model
const Trainer = mongoose.model('Trainer', trainerSchema);

// Export the model
module.exports = Trainer;
