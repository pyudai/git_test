let parenthesesCount = 0;

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

function getInput(btn) {
  const result = document.querySelector("#result");
  let text = "";

  if (
    btn.textContent === "0" &&
    result.textContent.split(" ")[result.textContent.split(" ").length - 1]
      .length === 0
  ) {
    text = "";
  } else if (btn.textContent.match(/[()]/g)) {
    if (parenthesesCount % 2) {
      text = " )";
    } else {
      text = "( ";
    }
    parenthesesCount++;
  } else if (btn.textContent.match(/[0-9]/g)) {
    text = btn.textContent;
  } else {
    text = ` ${btn.textContent} `;
  }

  result.textContent += text;
}

function checkInput(arr) {
  let temp;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].match(/[(]/) && arr[i].match(/[0-9]/)) {
      temp = arr[i].slice(0, arr[i].length - 1);
      arr.splice(i, 1, temp, "*", "(");
    }

    if (arr[i].match(/[)]/) && arr[i].match(/[0-9]/)) {
      temp = arr[i].slice(1);
      arr.splice(i, 1, ")", "*", temp);
    }
    if (
      !arr[i].match(/[0-9]/) &&
      arr[i + 1] === "" &&
      !arr[i + 2].match(/[0-9]/)
    ) {
      return false;
    }
  }

  if (!(parenthesesCount % 2)) {
    parenthesesCount = 0;
    return false;
  }

  return arr;
}

function infix2Postfix(arr) {
  if (checkInput(arr)) arr = checkInput(arr);
  else return null;

  let outputStk = [];
  let operatorStk = [];

  for (let i in arr) {
    if (arr[i].match(/[0-9]/g)) {
      outputStk.push(arr[i]);
    } else if (arr[i].match(/[^0-9]/g) && operatorStk.length === 0) {
      operatorStk.push(arr[i]);
    } else {
      if (
        getOperatorRank(arr[i]) >
          getOperatorRank(operatorStk[operatorStk.length - 1]) &&
        !arr[i].match(/[(,)]/)
      ) {
        operatorStk.push(arr[i]);
      } else if (
        getOperatorRank(arr[i]) <=
          getOperatorRank(operatorStk[operatorStk.length - 1]) &&
        !arr[i].match(/[(,)]/)
      ) {
        if (!operatorStk[operatorStk.length - 1].match(/[(]/)) {
          for (
            let j = operatorStk.length - 1;
            getOperatorRank(operatorStk[j]) >= getOperatorRank(arr[i]);
            j--
          ) {
            outputStk.push(operatorStk.pop());
            if (j < 0) {
              break;
            }
          }
        }
        operatorStk.push(arr[i]);
      } else if (arr[i].match(/[(]/)) {
        operatorStk.push(arr[i]);
      } else if (arr[i].match(/[)]/)) {
        for (
          let j = operatorStk.length - 1;
          !operatorStk[j].match(/[(]/);
          j--
        ) {
          outputStk.push(operatorStk.pop());
          if (j < 0) {
            break;
          }
        }
        operatorStk.pop();
      }
    }
  }

  while (operatorStk.length > 0) {
    outputStk.push(operatorStk.pop());
  }

  return outputStk;
}

function calPostfix(arr) {
  let resultStk = [];
  for (let i in arr) {
    resultStk.push(arr[i]);
    if (arr[i].match(/[^0-9]/g)) {
      const operator = resultStk.pop();
      const y = resultStk.pop();
      const x = resultStk.pop();
      resultStk.push(operate(operator, x, y));
    }
  }
  return resultStk[0];
}

function clearResult() {
  document.querySelector("#result").textContent = "";
  parenthesesCount = 0;
}

function getResult() {
  const str = document.querySelector("#result");
  let prob = str.textContent.trim().split(" ");

  prob = infix2Postfix(prob);
  str.textContent = prob ? calPostfix(prob) : "Wrong Input!";
}
