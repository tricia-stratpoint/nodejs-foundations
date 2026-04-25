// user.js
const user = {
  name: "Tricia",
  role: "Software Engineer",
  yearsOfExperience: 1,
  favoriteLanguages: ["JavaScript", "Kotlin", "Python"],
};

console.log("Name:", user.name);

console.log("First favorite language:", user["favoriteLanguages"][0]);

user.isLearningNodeJS = true;

console.log("User Object:");
console.log(user);
