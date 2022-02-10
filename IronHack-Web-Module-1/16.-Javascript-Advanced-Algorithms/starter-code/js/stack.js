// CREATE NEW STACK
const stack = new StackDataStructure();

// INITIAL LAYOUT

/// Get main container
const container = document.getElementsByClassName('container')[0];

/// Title
const stackTitle = document.createElement('h2');
stackTitle.innerText = 'Stack';
container.appendChild(stackTitle);

/// Controls container
const stackControlsContainer = document.createElement('div');
stackControlsContainer.className = 'controls-container';

/// Input
const stackInput = document.createElement('input');
stackInput.placeholder = 'Add the element to the stack...';
stackInput.className = 'form-control';

/// Add
const addStackBtn = document.createElement('button');
addStackBtn.innerHTML = 'ADD';
addStackBtn.className = 'btn btn-primary btn-sm btn-block';

/// Take
const takeStackBtn = document.createElement('button');
takeStackBtn.innerHTML = 'TAKE';
takeStackBtn.className = 'btn btn-danger btn-sm btn-block';

/// Add elements to container
stackControlsContainer.appendChild(stackInput);
stackControlsContainer.appendChild(addStackBtn);
stackControlsContainer.appendChild(takeStackBtn);
container.appendChild(stackControlsContainer);

/// Stack structure
const stackStructure = document.createElement('div');
stackStructure.className = 'structure';

/// Stack List
const stackList = document.createElement('ul');
stackList.className = 'structure-list list-group';

for(let i = 0; i < stack.MAX_SIZE; i ++) {
  const row = document.createElement('li');
  row.id = 'item-stack-' + i;
  row.className = 'list-group-item';
  stackList.appendChild(row);
}

// Take list
const takeStackList= document.createElement('ul');
takeStackList.className = 'take-list';

// Add elements to container
stackStructure.appendChild(stackList);
stackStructure.appendChild(takeStackList);
container.appendChild(stackStructure);

// ADD EVENT LISTENERS AND LOGIC

function findStackId (isPush) {
  const id = stack.MAX_SIZE - stack.stackControl.length;
  return isPush ? 'item-stack-' + id : 'item-stack-' + (id - 1); 
}

function createItem (id, value) {
  const item = document.getElementById(id);
  item.innerText = value;
  item.classList.add('active-item');
}

function resetItem (id) {
  const item = document.getElementById(id);
  item.innerText = "";
  item.classList.remove('active-item');
}

function createTakenItem(element, value) {
  const row = document.createElement('li');
  row.innerText = value;
  element.appendChild(row);
}

function createErrorMessage(id, controls, btn) {
  const isCreated = document.getElementById(id);
  if(isCreated === null) {
    const message = document.createElement('p');
    message.innerText = 'Missing input value';
    message.id = id;
    controls.insertBefore(message, btn);
  }
}

function createFlowAlert (alert, id, element) {
  const isCreated = document.getElementById(id);
  if(isCreated === null) {
    const flowAlert = document.createElement('li');
    flowAlert.innerText = alert;
    flowAlert.className = 'list-group-item';
    flowAlert.id = id;
    if (alert === "Stack Underflow" || alert === "Queue Overflow") {
      element.appendChild(flowAlert);
    } else {
      element.insertBefore(flowAlert, element.firstChild);
    }
  }
}

function removeItemById(id) {
  const item = document.getElementById(id);
  if(item !== null) {
    item.remove();
  }
}

const handleStackAdd = function () {
  const value = stackInput.value;
  if(value !== '') {
    removeItemById('error-stack-message');
    const addResult = stack.push(value);
    if(addResult === 'Stack Overflow') {
      createFlowAlert(addResult, 'stack-flow-alert', stackList);
    } else {
      const id = findStackId(true);
      removeItemById('stack-flow-alert');
      createItem(id, value);
    }
  } else {
    createErrorMessage('error-stack-message', stackControlsContainer, addStackBtn);
  }
}

const handleStackTake = function () {
  const takeResult = stack.pop();
  if(takeResult === 'Stack Underflow') {
    createFlowAlert(takeResult, 'stack-flow-alert', stackList);
  } else {
    const id = findStackId(false);
    removeItemById('stack-flow-alert');
    resetItem(id);
    createTakenItem(takeStackList, takeResult);
  }
}

addStackBtn.addEventListener('click', handleStackAdd);
takeStackBtn.addEventListener('click', handleStackTake);
