'use strict';

const checkSearchMain = function () {
  const pokemonName = document.querySelector('input[name="pokemon"]');

  pokemonName.addEventListener('input', () => {
    axios.get(`/api/search-pokemon?q=${pokemonName.value}`)
      .then(({ data }) => {
        const divElement = document.getElementById('search-options');
        divElement.innerHTML = '';
        if (data.data.length) {
          divElement.classList.add('search-options');
          const ulElement = document.createElement('ul');
          data.data.forEach(pokemon => {
            let name = pokemon.name;
            name = name.charAt(0).toUpperCase() + name.substr(1);
            const liElement = document.createElement('li');
            liElement.innerText = name;
            ulElement.appendChild(liElement);
          });
          divElement.appendChild(ulElement);
        } else if (!data.data.length) {
          divElement.classList.remove('search-options');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

window.addEventListener('load', checkSearchMain);
