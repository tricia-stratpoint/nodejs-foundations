// src/calculator.ts

// Type alias
type Operation = "add" | "subtract" | "multiply" | "divide";

// Functions
function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number | string {
  if (b === 0) {
    return "Cannot divide by zero";
  }

  return a / b;
}

// Calculate function
function calculate(op: Operation, a: number, b: number): number | string {
  switch (op) {
    case "add":
      return add(a, b);

    case "subtract":
      return subtract(a, b);

    case "multiply":
      return multiply(a, b);

    case "divide":
      return divide(a, b);

    default:
      return "Invalid operation";
  }
}

// Test cases
console.log(calculate("add", 1, 1));
console.log(calculate("subtract", 10, 2));
console.log(calculate("multiply", 5, 5));
console.log(calculate("divide", 10, 5));
console.log(calculate("divide", 100, 0));
