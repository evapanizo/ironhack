function StackDataStructure () {

  // Variables
  this.stackControl = [];
  this.MAX_SIZE = 10;

  // Methods
  /// Is the current stack empty?
  this.isEmpty = function () {
    return this.stackControl.length === 0;
  }

  /// Can an element be pushed to the stack?
  this.canPush = function () {
    return this.stackControl.length < this.MAX_SIZE;
  }

  /// Push an element to the stack.
  this.push = function (elem) {
    if(this.canPush()) {
      this.stackControl.push(elem);
      return this.stackControl;
    }
    return 'Stack Overflow';
  }

  /// Pop an element from the stack.
  this.pop = function () {
    return this.isEmpty() ? 'Stack Underflow' : this.stackControl.pop();
  }

}
