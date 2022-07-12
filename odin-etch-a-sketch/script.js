function changeColor(e) {
//   console.log(e.target);
  e.target.classList.toggle('change');
}

const board = document.createElement("div");
board.setAttribute("class", "board");

const len = 16;

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

const body = document.querySelector("body");
body.appendChild(board);
