// calculator.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}   

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

console.log(add(1, 1));
console.log(subtract(10, 2));
console.log(multiply(5, 5));
console.log(divide(10, 5));
console.log(divide(100, 0));