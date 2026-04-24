// grade.js
function getGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else if (score >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

const scores = [95, 82, 70, 67, 53];

scores.forEach(score => {
  console.log(`Score: ${score}, Grade: ${getGrade(score)}`);
});