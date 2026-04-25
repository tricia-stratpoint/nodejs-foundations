// numbers.js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubledNumbers = numbers.map((n) => n * 2);

const evenNumbers = numbers.filter((n) => n % 2 === 0);

const sumOfNumbers = numbers.reduce((sum, n) => sum + n, 0);

console.log("Doubled:", doubledNumbers);
console.log("Even numbers:", evenNumbers);
console.log("Sum:", sumOfNumbers);