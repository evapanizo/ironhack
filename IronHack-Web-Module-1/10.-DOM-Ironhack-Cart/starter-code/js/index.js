function deleteItem (e) {
  const bodyElement = document.getElementsByTagName('body');
  const productContainer = e.target.parentElement.parentElement;
  e.target.removeEventListener('click', deleteItem);
  bodyElement[0].removeChild(productContainer);
}

function getPriceByProduct (itemNode) {
  return itemNode.textContent;
}

function getQuantityByProduct (itemNode) {
  return itemNode.value;
}

function updatePriceByProduct (productPrice, index) {
  const productQuantities = document.getElementsByClassName('quantity');
  const productTotalPrices = document.getElementsByClassName('total-price');
  const price = getPriceByProduct(productPrice);
  const quantity = getQuantityByProduct(productQuantities[index]);
  productTotalPrices[index].textContent = (price * quantity).toFixed(2);
  return price * quantity;
}

function getTotalPrice () {
  let totalPrice = 0;
  const productPrices = document.getElementsByClassName('price');
  const totalPriceDisplay = document.getElementById('total-price-display');
  for(let i = 0; i < productPrices.length ; i++) {
    totalPrice += updatePriceByProduct(productPrices[i] , i);
  }
  totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

function createQuantityInput () {
  const newQuantityInput = document.createElement('div');
  newQuantityInput.className = 'product-quantity';
  const newLabel = document.createElement('label');
  newLabel.innerText = 'QTY';
  const newInput = document.createElement('input');
  newInput.className = 'quantity';
  newInput.setAttribute('type', 'number');
  newInput.setAttribute('value', '0');
  newInput.setAttribute('min', '0');
  newQuantityInput.appendChild(newLabel);
  newQuantityInput.appendChild(newInput);
  return newQuantityInput;
}

function createDeleteButton () {
  const newDeleteDiv = document.createElement('div');
  newDeleteDiv.className = 'product-delete-btn';
  const newButton = document.createElement('button');
  newButton.className = 'btn btn-delete';
  newButton.innerText = 'Delete';
  newButton.onclick = deleteItem;
  newDeleteDiv.appendChild(newButton);
  return newDeleteDiv;
}

function createQuantityNode () {
  const totalPriceDiv = document.createElement('div');
  totalPriceDiv.className = 'product-total-price';
  totalPriceDiv.innerText = '$';
  const newSpan = document.createElement('span');
  newSpan.className = 'total-price';
  newSpan.innerText = '0.00';
  totalPriceDiv.appendChild(newSpan);
  return totalPriceDiv;
}

function createNameNode (name) {
  const nameDiv = document.createElement('div');
  nameDiv.className = 'product-name';
  const newSpan = document.createElement('span');
  newSpan.className = 'name';
  newSpan.innerText = name;
  nameDiv.appendChild(newSpan);
  return nameDiv;
}

function createPriceNode (price) {
  const priceDiv = document.createElement('div');
  priceDiv.className = 'product-price';
  priceDiv.innerText= '$';
  const newSpan = document.createElement('span');
  newSpan.className = 'price';
  newSpan.innerText = parseFloat(price).toFixed(2);
  priceDiv.appendChild(newSpan);
  return priceDiv;
}

function createNewItemRow (itemName, itemUnitPrice) {
  const newProduct = document.createElement('div');
  newProduct.className = 'product-container';
  const nameNode = createNameNode(itemName);
  const priceNode = createPriceNode(itemUnitPrice);
  const quantityInput = createQuantityInput();
  const quantityNode = createQuantityNode();
  const deleteButton = createDeleteButton();
  newProduct.appendChild(nameNode);
  newProduct.appendChild(priceNode);
  newProduct.appendChild(quantityInput);
  newProduct.appendChild(quantityNode);
  newProduct.appendChild(deleteButton);
  return newProduct;
}

function createNewItem () {
  const textElement = document.getElementById('new-name');
  const priceElement = document.getElementById('new-price');
  const newItemRow = createNewItemRow(textElement.value, priceElement.value);
  const bodyElement = document.getElementsByTagName('body')[0];
  const createElement = document.getElementById('add-new-item');
  bodyElement.insertBefore(newItemRow, createElement);
  textElement.value = "";
  priceElement.value = "";
}

window.onload = function () {
  const calculatePriceButton = document.getElementById('calc-prices-button');
  const deleteButtons = document.getElementsByClassName('btn-delete');
  const createItemButton = document.getElementById('new-item-create');

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for(let i = 0; i < deleteButtons.length ; i++) {
    deleteButtons[i].onclick = deleteItem;
  }

};
