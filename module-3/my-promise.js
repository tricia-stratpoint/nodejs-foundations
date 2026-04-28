// my-promise.js
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done waiting!");
    }, ms);
  });
}

// 1. using .then()
wait(1000).then((message) => {
  console.log("Then:", message);
});

// 2. async/await
async function runAwait() {
  const message = await wait(1000);
  console.log("Await:", message);
}

runAwait();

// 3. with await with try/catch
async function runTryCatch() {
  try {
    const message = await wait(1000);
    console.log("Try/Catch:", message);
  } catch (error) {
    console.error("Error:", error);
  }
}

runTryCatch();