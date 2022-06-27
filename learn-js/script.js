/* Numbers */

// console.log(23 + 97);

// console.log(1 + 28 + 21 + 32 + 5 + 23);

// console.log((4 + 6 + 9) / 77);

let a = 10;
let max = 57;
let actual = max - 13;
let percentage = actual / max;

/* FUNDAMENTALS PART 3 : Function

1. Write a function called add7 that takes one number and returns that number + 7.
2. Write a function called multiply that takes 2 numbers and returns their product.
3. Write a function called capitalize that takes a string and returns that string with only the first letter capitalized. 
   Make sure that it can take strings that are lowercase, UPPERCASE or BoTh.
4. Write a function called lastLetter that takes a string and returns the very last letter of that string:
    a. lastLetter("abcd") should return "d"
*/

function add7(num) {
  return num + 7;
}

// Variable with Anonymous function
const multiply = function (num1, num2) {
  return num1 * num2;
};

// arrow function
const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

let lastLetter = (str) => str[str.length - 1];

// invoke functions
                                  // result
console.log(add7(3));               // 10
console.log(multiply(3,5));         // 15
console.log(capitalize("heLlO"));   // Hello
console.log(lastLetter("WordS"));   // S
