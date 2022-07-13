function changeColor(e) {
  e.target.classList.toggle("change");
}

const body = document.querySelector("body");
let len = 16;

function getLenTable(e) {
  do {
    len = prompt("How many squares per side do you want? (1-100)");
    len = Number(len);
    if (!len) alert("It's not a number. Please enter again.");
    if(len <= 0 || len > 100)
      alert("You should enter number between 1 to 100");
  } while (!Number(len)||len <= 0 || len > 100);
  createTable();
}

const btn = document.createElement("button");
btn.addEventListener("click", getLenTable);
btn.textContent = "Create new table";
body.appendChild(btn);

function createTable() {
  document
    .querySelectorAll(".board")
    .forEach((board) => body.removeChild(board));

  const board = document.createElement("div");
  board.setAttribute("class", "board");

  for (let i = 0; i < len; i++) {
    const cellCol = document.createElement("div");
    cellCol.setAttribute("class", "cell-col");
    for (let j = 0; j < len; j++) {
      const cellRow = document.createElement("div");
      cellRow.setAttribute("class", "cell-row");
      cellRow.addEventListener("mouseover", changeColor);
      cellCol.appendChild(cellRow);
    }
    board.appendChild(cellCol);
  }
  body.appendChild(board);
}

createTable();
