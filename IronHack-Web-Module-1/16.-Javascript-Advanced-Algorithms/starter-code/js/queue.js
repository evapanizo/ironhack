// CREATE NEW STACK
const queue = new QueueDataStructure();

// INITIAL LAYOUT

/// Title
const queueTitle = document.createElement('h2');
queueTitle.innerText = 'Queue';
container.appendChild(queueTitle);

/// Controls container
const queueControlsContainer = document.createElement('div');
queueControlsContainer.className = 'controls-container';

/// Input
const queueInput = document.createElement('input');
queueInput.placeholder = 'Add the element to the queue...';
queueInput.className = 'form-control';

/// Add
const addQueueBtn = document.createElement('button');
addQueueBtn.innerHTML = 'ADD';
addQueueBtn.className = 'btn btn-primary btn-sm btn-block';

/// Take
const takeQueueBtn = document.createElement('button');
takeQueueBtn.innerHTML = 'TAKE';
takeQueueBtn.className = 'btn btn-danger btn-sm btn-block';

/// Add elements to container
queueControlsContainer.appendChild(queueInput);
queueControlsContainer.appendChild(addQueueBtn);
queueControlsContainer.appendChild(takeQueueBtn);
container.appendChild(queueControlsContainer);

/// Queue structure
const queueStructure = document.createElement('div');
queueStructure.className = 'structure';

/// Queue List
const queueList = document.createElement('ul');
queueList.className = 'structure-list list-group';

for(let i = 0; i < queue.MAX_SIZE; i ++) {
  const column = document.createElement('li');
  column.id = 'item-queue-' + i;
  column.className = 'list-group-item';
  queueList.appendChild(column);
}

// Take list
const takeQueueList= document.createElement('ul');
takeQueueList.className = 'take-list';

// Add elements to container
queueStructure.appendChild(queueList);
queueStructure.appendChild(takeQueueList);
container.appendChild(queueStructure);

// ADD EVENT LISTENERS AND LOGIC

function updateQueueItems () {
  const length = queue.queueControl.length;
  for(let i = length; i >= 0; i--) {
    const item = document.getElementById('item-queue-' + i);
    if(i === length) {
      item.innerText = "";
      item.classList.remove('active-item');
    } else {
      item.innerText = queue.queueControl[length - 1 - i];
    }
  }
}

const handleQueueAdd = function () {
  const value = queueInput.value;
  if(value !== '') {
    removeItemById('error-queue-message');
    const addResult = queue.enqueue(value);
    if(addResult === 'Queue Overflow') {
      createFlowAlert(addResult, 'queue-flow-alert', queueList);
    } else {
      const id = 'item-queue-' + (queue.queueControl.length - 1);
      removeItemById('queue-flow-alert');
      createItem(id, value);
    }
  } else {
    createErrorMessage('error-queue-message', queueControlsContainer, addQueueBtn);
  }
}

const handleQueueTake = function () {
  const takeResult = queue.dequeue();
  if(takeResult === 'Queue Underflow') {
    createFlowAlert(takeResult, 'queue-flow-alert', queueList);
  } else {
    removeItemById('queue-flow-alert');
    updateQueueItems();
    createTakenItem(takeQueueList, takeResult);
  }
}

addQueueBtn.addEventListener('click', handleQueueAdd);
takeQueueBtn.addEventListener('click', handleQueueTake);
