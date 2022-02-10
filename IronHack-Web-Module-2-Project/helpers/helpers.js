function getPathImages (path) {
  return `/images/${path}`;
}

function pkmnFirstToCapital (trainer) {
  trainer.myPokemon.forEach(pokemon => {
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substr(1);
  });
  trainer.wishList.forEach(pokemon => {
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substr(1);
  });
  return trainer;
}

module.exports = {
  getPathImages,
  pkmnFirstToCapital
};
