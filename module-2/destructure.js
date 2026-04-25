// destructure.js
const product = { name: "Laptop", price: 1200, brand: "Dell", inStock: true };

const { name, price } = product;

console.log("Name:", name);
console.log("Price:", price);

const colors = ["red", "green", "blue"];

const [primary, secondary] = colors;

console.log("Primary color:", primary);
console.log("Secondary color:", secondary);
