'use strict';

const main = function () {
  const pokemonName = document.querySelector('input[name="pokemon"]');
  const pokemonButton = document.querySelector('button');
  let firstEvent = true;
  let id = 0;

  pokemonButton.addEventListener('click', () => {
    if (pokemonName.value === '') {
      const messageElement = document.getElementById('error-message');
      messageElement.innerText = 'Upps, it seems that you forgot to fill the blanks';
    } else {
      axios.get(`/api/trades/pokemon?q=${pokemonName.value}`)
        .then(({ data }) => {
          if (data.data) {
          // Reset
            const messageElement = document.getElementById('error-message');
            messageElement.innerText = '';
            const divElement = document.getElementById('search-options');
            divElement.innerHTML = '';
            divElement.classList.remove('search-options');
            // Elements
            const formElement = document.getElementById('checkbox-form');
            const checkboxElement = document.createElement('input');
            const labelElement = document.createElement('label');
            const hiddenButton = document.getElementById('hidden-btn');
            const containerElement = document.createElement('div');
            let name = data.data.name;
            name = name.charAt(0).toUpperCase() + name.substr(1);
            const pokemonId = data.data._id;
            // Checkbox
            checkboxElement.setAttribute('type', 'checkbox');
            checkboxElement.setAttribute('checked', true);
            checkboxElement.setAttribute('value', pokemonId);
            checkboxElement.setAttribute('name', id);
            checkboxElement.classList.add('checkbox-tick');
            id++;
            // Label
            labelElement.innerText = name;
            labelElement.classList.add('checkbox-label');
            // Container
            containerElement.classList.add('checkbox-elems');
            // Append elements
            containerElement.appendChild(checkboxElement);
            containerElement.appendChild(labelElement);
            formElement.insertBefore(containerElement, hiddenButton);
            // First Event
            if (firstEvent) {
              hiddenButton.classList.remove('hidden');
              firstEvent = false;
            }
          } else {
          // Elements
            const messageElement = document.getElementById('error-message');
            messageElement.innerText = 'Upps, the pokemon does not exist';
          }
          pokemonName.value = '';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

window.addEventListener('load', main);
