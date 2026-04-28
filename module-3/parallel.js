// parallel.js

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done waiting!");
    }, ms);
  });
}

// Part A — Sequential
async function runSequential() {
  console.time("Sequential");

  await wait(1000);
  await wait(1000);
  await wait(1000);

  console.timeEnd("Sequential");
}

// Part B — Parallel
async function runParallel() {
  console.time("Parallel");

  await Promise.all([wait(1000), wait(1000), wait(1000)]);

  console.timeEnd("Parallel");
}

// Run both
async function main() {
  await runSequential();
  await runParallel();
}

main();