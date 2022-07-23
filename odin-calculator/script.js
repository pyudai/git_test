let parenthesesCount = [0, 0];
const isNum = (x) => typeof Number(x) === "number" && isFinite(Number(x));

const add = (x, y) => Number(x) + Number(y);
const subtract = (x, y) => Number(x) - Number(y);
const multiply = (x, y) => Number(x) * Number(y);
const divide = (x, y) => Number(x) / Number(y);

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function getOperatorRank(operator) {
  return operator === "(" || operator === ")"
    ? 3
    : operator === "*" || operator === "/"
    ? 2
    : operator === "+" || operator === "-"
    ? 1
    : null;
}

function getInput(input, isBtn) {
  const result = document.querySelector("#result");
  let text = "";

  input = isBtn ? input.textContent : input;

  if (
    isNum(input) &&
    result.textContent.split(" ")[result.textContent.split(" ").length - 1] ===
      "0"
  ) {
    result.textContent = result.textContent.slice(
      0,
      result.textContent.length - 1
    );
  }

  if (!!result.textContent.match(/Wrong Input!/)) {
    result.textContent = "";
  }

  if (!!input.match(/DEL/) || !!input.match(/Backspace/)) {
    result.textContent = result.textContent.slice(
      0,
      result.textContent.length - 1
    );
    return;
  }

  if (input.match(/[()]/g)) {
    if (input.match(/[)]/g)) {
      text = " )";
      parenthesesCount[1]++;
    } else {
      text = "( ";
      parenthesesCount[0]++;
    }
  } else if (isNum(input) || input === ".") {
    text = input;
  } else {
    text = ` ${input} `;
  }

  result.textContent += text;
}

function checkInput(arr) {
  let temp;

  if (
    arr.length <= 2 ||
    (!isNum(arr[arr.length - 1]) && arr[arr.length - 1] !== ")")
  )
    return null;

  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i].match(/[(]/) && arr[i].match(/[0-9]/)) {
      // find number /w '('
      temp = arr[i].slice(0, arr[i].length - 1);
      arr.splice(i, 1, temp, "*", "(");
    }

    if (arr[i].match(/[)]/) && arr[i].match(/[0-9]/)) {
      // find number /w ')'
      temp = arr[i].slice(1);
      arr.splice(i, 1, ")", "*", temp);
    }
    if (
      !isNum(arr[i]) &&
      arr[i + 1] === "" &&
      !isNum(arr[i + 2]) &&
      i + 2 < arr.length - 1
    ) {
      return null;
    }
  }
  if (parenthesesCount[0] !== parenthesesCount[1]) {
    return null;
  }

  return arr;
}

function infix2Postfix(arr) {
  arr = checkInput(arr);
  if (!arr) return arr;

  let outputStk = [];
  let operatorStk = [];

  for (let i in arr) {
    if (isNum(arr[i])) {
      // If the character is an operand, put it into output stack.
      outputStk.push(arr[i]);
    } else if (isNum(arr[i]) && operatorStk.length === 0) {
      /* If the character is an operator and operator's stack is empty, */
      /* push operator into operators' stack.                           */
      operatorStk.push(arr[i]);
    } else {
      if (arr[i].match(/[(]/)) {
        // If the character is opening round bracket, push it into operator's stack.
        operatorStk.push(arr[i]);
      } else if (arr[i].match(/[)]/)) {
        /* If the character is closing round bracket,                                 */
        /* pop out operators from operator's stack untill we find an opening bracket. */
        for (
          let j = operatorStk.length - 1;
          !operatorStk[j].match(/[(]/);
          j--
        ) {
          outputStk.push(operatorStk.pop());
        }
        operatorStk.pop(); // pop '(' out
      } else if (
        getOperatorRank(arr[i]) >
        getOperatorRank(operatorStk[operatorStk.length - 1])
      ) {
        // If the precedence of scanned operator is greater than the top most operator of operator's stack,
        // push this operator into operator's stack.
        operatorStk.push(arr[i]);
      } else if (
        getOperatorRank(arr[i]) <=
        getOperatorRank(operatorStk[operatorStk.length - 1])
      ) {
        // If the precedence of scanned operator is less than or equal to the top most operator of operator's stack,
        // pop the operators from operand's stack untill we find a low precedence operator than the scanned character.
        if (!operatorStk[operatorStk.length - 1].match(/[(]/)) {
          for (
            let j = operatorStk.length - 1;
            getOperatorRank(operatorStk[j]) >= getOperatorRank(arr[i]);
            j--
          ) {
            outputStk.push(operatorStk.pop());
          }
        }
        operatorStk.push(arr[i]);
      }
    }
  }

  // pop out all the remaining operators from the operator's stack and push into output stack.
  while (operatorStk.length > 0) {
    outputStk.push(operatorStk.pop());
  }

  return outputStk;
}

function calPostfix(arr) {
  let resultStk = [];
  for (let i in arr) {
    resultStk.push(arr[i]);
    if (!isNum(arr[i])) {
      const operator = resultStk.pop();
      const y = resultStk.pop();
      const x = resultStk.pop();
      resultStk.push(operate(operator, x, y));
    }
  }
  return isNum(resultStk[0]) ? resultStk[0] : null;
}

function clearResult() {
  document.querySelector("#result").textContent = "";
  parenthesesCount = [0, 0];
}

function getResult() {
  const str = document.querySelector("#result");
  let prob = str.textContent.trim().split(" ");
  let temp = "";
  prob = infix2Postfix(prob);

  if (prob) temp = calPostfix(prob);

  str.textContent =
    prob && isNum(temp)
      ? Math.round(Number(temp) * 1000) / 1000
      : "Wrong Input!";
  parenthesesCount = [0, 0];
}

function isKInput(key) {
  return (
    isNum(key) ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "." ||
    key === "=" ||
    key.match(/[()]/) ||
    key === "Backspace"
  );
}

function getKeyBoardInput(e) {
  if (!isKInput(e.key)) return;
  if (e.key === "=") getResult();
  else {
    getInput(e.key, false);
  }
}

window.addEventListener("keydown", getKeyBoardInput);
