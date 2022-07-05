const gameElements = ["Rock", "Paper", "Scissors"];

//random a gameElement index
const computerPlay = () => Math.floor(Math.random() * 3);

// to convert user input to compare with gameElements
const capLetter = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

//find index of gameElements that user play
const getGameElementIndex = (str) =>
  !str ? -1 : gameElements.findIndex((x) => capLetter(str).includes(x));

// one round of game -> return the person who won the game
function playRound(playerSelection, computerSelection) {
  playerSelection = getGameElementIndex(playerSelection);

  if (playerSelection < 0) {
    //if user not input the gameElement
    console.log("It isn't a game element. Please enter again");
    return null;
  }

  if (playerSelection === computerSelection) {
    // draw
    return { result: "draw", str: `Draw! ${gameElements[playerSelection]}` };
  } else if (
    // player win
    (playerSelection === 2 && computerSelection === 1) || // player : Scissors  , com : Paper
    (playerSelection === 1 && computerSelection === 0) || // player : Paper     , com : Rock
    (playerSelection === 0 && computerSelection === 2) // player : Rock      , com : Scissors
  ) {
    return {
      result: "player",
      str: `You win! ${gameElements[playerSelection]} beats ${gameElements[computerSelection]}`,
    };
  } else {
    // com win
    return {
      result: "computer",
      str: `You Lose! ${gameElements[computerSelection]} beats ${gameElements[playerSelection]}`,
    };
  }
}
let scores = { player: 0, computer: 0 };

function playerSelect(e) {
  const { result, str } = playRound(e.textContent, computerPlay());
  const div = document.querySelector("#resultStr");
  const scoreDiv = document.querySelectorAll(".score");
  div.textContent = str;

  if (result && !result.includes("draw")) scores[result] += 1;
  scoreDiv.forEach((score) => (score.textContent = scores[score.id]));
  
  // check if one player reaches 5 points
  if (scores.computer === 5 || scores.player === 5) {
    console.log("end Game");
    document.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
    const restart = document.createElement("button");
    restart.id = "restart";
    restart.textContent = "New Game";
    restart.addEventListener("click", () => {
      scores = { player: 0, computer: 0 };
      scoreDiv.forEach((score) => (score.textContent = scores[score.id]));
      document
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = false));
      document
        .querySelector("body")
        .removeChild(document.querySelector("#restart"));
    });
    document.querySelector("body").appendChild(restart);
  }
}

// function game(playerSelection) {
//   let scores = { player: 0, computer: 0 };
//   // for (let i = 0; i < 5; i++) {
//   //   let playerSelection, result;
//   //   console.log(`%cRound ${i + 1} :`,"font-weight: bold");
//   // do {
//   // playerSelection = prompt(`Round ${i + 1} : Rock / Paper / Scissors ?`);
//   result = playRound(playerSelection, computerPlay());
//   // if (result && !result.includes("draw")) scores[result] += 1;
//   // } while (result === null);
//   // }
//   // console.log("%c--------------------------------------", "color: lightgray");
//   // console.log("%cScore:", "font-weight: bold", scores);
//   // console.log(
//   //   "%cResult: ",
//   //   "font-weight: bold",
//   //   scores.player === scores.computer
//   //     ? "Draw"
//   //     : scores.player > scores.computer
//   //     ? "You win!"
//   //     : "You Lose"
//   // );
//   // console.log("%c--------------------------------------", "color: lightgray");
