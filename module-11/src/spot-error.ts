// src/spot-errors.ts

interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

// Error 1
// Type 'string' is not assignable to type 'number'

const count: number = "42";

// Correct version
const fixedCount: number = 42;

// Error 2
// Property 'isAdmin' is missing in type

const user: User = {
  id: 1,
  name: "Ana",
};

// Correct version
const fixedUser: User = {
  id: 1,
  name: "Ana",
  isAdmin: false,
};

// Error 3
// Argument of type 'number' is not assignable to parameter of type 'string'

function greet(name: string): string {
  return `Hello, ${name}`;
}

greet(123);

// Correct version
greet("Ana");

// Error 4
// Type 'boolean' is not assignable to type 'string'

const productName: string = true;

// Correct version
const fixedProductName: string = "Laptop";

// Error 5
// Property 'push' does not exist on type 'string'

const message: string = "Hello";

message.push("!");

// Correct version
const fixedMessage: string = "Hello!";
