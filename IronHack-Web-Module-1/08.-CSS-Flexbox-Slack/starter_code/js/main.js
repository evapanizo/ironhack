'use strict';

function main () {

  const handleClickMenu = () => {
    const menuListElement = document.getElementById("menu-list");
    menuListElement.classList.toggle("hidden");
  }

  const menuElement = document.getElementById("menu-container");
  menuElement.addEventListener("click", handleClickMenu);
  
}

document.addEventListener('DOMContentLoaded', main);