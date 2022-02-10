// Find the maximum
const maxOfTwoNumbers = (num1, num2) => {
  return num1 > num2 ? num1 : num2;
}

// Finding Longest Word
const findLongestWord = (array) => {
  // Is empty?
  if (!array.length) { return; }
  // Longest word
  let longestWord = '';
  array.forEach( word => word.length > longestWord.length ? longestWord = word : null);
  return longestWord;
}

// Calculating a Sum
const sumArray = (array) => {
  return array.reduce( (acc, cval) => acc + cval, 0);
}

// Calculate the Average
const averageNumbers = (array) => {
  // Is empty?
  if (!array.length) { return; }
  // Average
  return sumArray(array) / array.length;
}

// Array of Strings
const averageWordLength = (array) => {
  const lengthArray = array.map( word => word.length);
  return averageNumbers(lengthArray);
}

// Unique Arrays
const uniquifyArray = (array) => {
  // Is empty?
  if (!array.length) { return; }
  // Uniquify
  let uniqueArray = [];
  array.forEach( word => uniqueArray.indexOf(word) === -1 ? uniqueArray.push(word) : null);
  return uniqueArray;
}

// Finding Elements (don't use indexOf)
const doesWordExist = (array, word) => {
  let exists = false;
  array.forEach( arrayWord => arrayWord === word ? exists = true : null)
  return exists;
}

// Counting Repetion
const howManyTimes = (array, word) => {
  // Is empty?
  if (!array.length) { return false; }
  // Count
  let count = 0;
  array.forEach( arrayWord => arrayWord === word ? count++ : null)
  return count;
}

// Bonus Quest
const findRowGreatestProduct = (row) => {
  let greatestProduct = 0;
  for (let i = 0; i < row.length - 3; i++) {
    const product = row[i] * row[i+1] * row[i+2] * row[i+3];
    greatestProduct < product ? greatestProduct = product : null;
  }
  return greatestProduct;
}

const findAllRowsGreatestProduct = (matrix) => {
  let greatestProduct = 0;
  for (let n = 0; n < matrix.length; n++) {
    const rowGreatestProduct = findRowGreatestProduct(matrix[n]);
    greatestProduct < rowGreatestProduct ? greatestProduct = rowGreatestProduct : null;
  }
  return greatestProduct;
}

const transposeMatrix = matrix => {
  return matrix[0].map((row,i) => matrix.map(row => row[i]))
}

const greatestProduct = (matrix) => {
  const horizontalMaxProduct = findAllRowsGreatestProduct(matrix);
  const matrixT = transposeMatrix(matrix);
  const verticalMaxProduct = findAllRowsGreatestProduct(matrixT);
  return horizontalMaxProduct > verticalMaxProduct ? horizontalMaxProduct : verticalMaxProduct
}