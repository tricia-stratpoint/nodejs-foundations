// src/narrowing.ts

function describe(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `Text with ${value.length} characters`;
  }

  if (typeof value === "number") {
    const type = value % 2 === 0 ? "even" : "odd";
    return `Number: ${value} (${type})`;
  }

  return `Boolean: ${value}`;
}

// Test cases
console.log(describe("TypeScript"));
console.log(describe(10));
console.log(describe(7));
console.log(describe(true));
console.log(describe(false));
