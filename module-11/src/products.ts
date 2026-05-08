// src/products.ts

// Interface
interface Product {
  id: number;
  name: string;
  price: number;
  category: "electronics" | "clothing" | "food";
  inStock: boolean;
  description?: string;
}

// Products array
const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 45000,
    category: "electronics",
    inStock: true,
    description: "15-inch gaming laptop",
  },
  {
    id: 2,
    name: "T-Shirt",
    price: 500,
    category: "clothing",
    inStock: true,
  },
  {
    id: 3,
    name: "Headphones",
    price: 2500,
    category: "electronics",
    inStock: false,
  },
  {
    id: 4,
    name: "Bread",
    price: 80,
    category: "food",
    inStock: true,
  },
  {
    id: 5,
    name: "Jacket",
    price: 1800,
    category: "clothing",
    inStock: false,
  },
];

// Get products by category
function getByCategory(products: Product[], cat: string): Product[] {
  return products.filter((product) => product.category === cat);
}

// Get available products
function getAvailable(products: Product[]): Product[] {
  return products.filter((product) => product.inStock);
}

// Get total value of in-stock products
function getTotalValue(products: Product[]): number {
  return products
    .filter((product) => product.inStock)
    .reduce((total, product) => total + product.price, 0);
}

// Results
console.log("Electronics:");
console.log(getByCategory(products, "electronics"));

console.log("\nAvailable Products:");
console.log(getAvailable(products));

console.log("\nTotal Value of In-Stock Products:");
console.log(getTotalValue(products));
