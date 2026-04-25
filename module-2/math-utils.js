// math-utils.js

function square(n) {
  return n * n;
}

function cube(n) {
  return n * n * n;
}

function average(numbers) {
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

function max(numbers) {
  return Math.max(...numbers);
}

module.exports = {
  square,
  cube,
  average,
  max,
};
