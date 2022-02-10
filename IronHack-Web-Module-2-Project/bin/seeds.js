// Packages
const Pokedex = require('pokedex-promise-v2');
const Pokemon = require('../models/pokemon');
const mongoose = require('mongoose');
const pokedex = new Pokedex();

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(error => {
    console.error(error);
  });

// Database seed
pokedex.getPokemonsList()
  // Response = {'name', 'url'}
  .then(response => {
    const pokemonPromises = [];
    for (let i = 0; i < 151; i++) {
      // Array of promises
      pokemonPromises.push(pokedex.resource(response.results[i].url));
    }
    return Promise.all(pokemonPromises);
  })
  // Pokemons = array of objects from the URL
  .then(pokemons => pokemons.map(pokemon => {
    return {
      name: pokemon.name,
      image: pokemon.sprites.front_default
    };
  }))
  // Pokemons = array of objects to insert in the database
  .then(pokemons => Pokemon.insertMany(pokemons))
  .then(() => {
    console.log('Disconnected from MongoDB!');
    mongoose.connection.close();
    process.exit();
  })
  .catch(error => console.log(error));
