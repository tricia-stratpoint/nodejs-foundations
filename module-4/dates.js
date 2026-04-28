// dates.js

const dayjs = require("dayjs");

// today
const today = dayjs();

// 7 days from now
const nextWeek = today.add(7, "day");

// 30 days ago
const lastMonth = today.subtract(30, "day");

// format function
function printDate(label, date) {
  console.log(label);
  console.log("Date:", date.format("YYYY-MM-DD"));
  console.log("Day:", date.format("dddd"));
  console.log("---");
}

printDate("Today", today);
printDate("7 Days From Now", nextWeek);
printDate("30 Days Ago", lastMonth);