const express = require("express");

const app = express();

// Route WITHOUT error handling (this is the problem version)
// app.get('/slow', async (req, res, next) => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   throw new Error('Something went wrong');
// });

// FIXED version with try/catch
app.get("/slow", async (req, res, next) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    throw new Error("Something went wrong");
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);

  res.status(500).json({
    error: {
      status: 500,
      message: err.message || "Internal server error",
    },
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Async test server running at http://localhost:${PORT}`);
});
