// fizzbuzz.js
let x = 1

while (x <= 30) {
    if (x % 3 === 0 && x % 5 === 0) {
        console.log('FizzBuzz')
    } else if (x % 3 === 0) {
        console.log('Fizz')
    } else if (x % 5 === 0) {
        console.log('Buzz')
    } else {
        console.log(x)
    }
    x++
}