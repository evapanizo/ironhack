function QueueDataStructure () {

  // Variables
  this.queueControl = [];
  this.MAX_SIZE = 10;
  
  // Methods
  /// Is the current queue empty?
  this.isEmpty = function () {
    return this.queueControl.length === 0;
  }

  /// Can an element be enqueued to the queue?
  this.canEnqueue = function () {
    return this.queueControl.length < this.MAX_SIZE;
  }

  /// Enqueue an element to the queue.
  this.enqueue = function (elem) {
    if(this.canEnqueue()) {
      this.queueControl.unshift(elem);
      return this.queueControl;
    }
    return 'Queue Overflow';
  }

  /// Dequeue an element from the queue.
  this.dequeue = function () {
    return this.isEmpty() ? 'Queue Underflow' : this.queueControl.pop();
  }

}
