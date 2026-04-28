// file-reader.js

const fs = require("fs/promises");
const path = require("path");

async function main() {
  // get filename from command line
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: node file-reader.js <filename>");
    process.exit(1);
  }

  const fileName = args[0];
  const filePath = path.join(__dirname, fileName);

  try {
    // read file content
    const content = await fs.readFile(filePath, "utf-8");

    // get file stats
    const stats = await fs.stat(filePath);

    // count lines
    const lines = content.split("\n").length;

    // output
    console.log("FILE CONTENT");
    console.log(content);

    console.log("INFO");
    console.log("Size:", stats.size, "bytes");
    console.log("Lines:", lines);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`File "${fileName}" not found.`);
    } else {
      console.log("Something went wrong:", error.message);
    }
  }
}

main();