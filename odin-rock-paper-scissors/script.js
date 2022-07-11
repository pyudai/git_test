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
  playerSelection = getGameElementIndex(playerSelection.trim());
  const div = document.querySelector("#round-result");

  if (playerSelection < 0) {
    //if user not input the gameElement
    console.log("It isn't a game element. Please enter again");
    div.removeAttribute("class");
    return { result: null, str: "It isn't a game element. Please enter again" };
  }

  if (playerSelection === computerSelection) {
    // draw
    div.removeAttribute("class");
    div.setAttribute("class", "draw");
    return { result: "draw", str: `Draw! ${gameElements[playerSelection]}` };
  } else if (
    // player win
    (playerSelection === 2 && computerSelection === 1) || // player : Scissors  , com : Paper
    (playerSelection === 1 && computerSelection === 0) || // player : Paper     , com : Rock
    (playerSelection === 0 && computerSelection === 2) // player : Rock      , com : Scissors
  ) {
    div.removeAttribute("class");
    div.setAttribute("class", "win");
    return {
      result: "player",
      str: `You win! ${gameElements[playerSelection]} beats ${gameElements[computerSelection]}`,
    };
  } else {
    // com win
    div.removeAttribute("class");
    div.setAttribute("class", "lose");
    return {
      result: "computer",
      str: `You Lose! ${gameElements[computerSelection]} beats ${gameElements[playerSelection]}`,
    };
  }
}

let scores = { player: 0, computer: 0 };

function playerSelect(e) {
  const { result, str } = playRound(e.textContent, computerPlay());
  const div = document.querySelector("#round-result");
  const scoreDiv = document.querySelectorAll(".score > div:nth-child(2)");
  div.textContent = str;

  if (result && !result.includes("draw")) scores[result] += 1;
  scoreDiv.forEach((score) => (score.textContent = scores[score.id]));

  // check if one player reaches 5 points
  if (scores.computer === 5 || scores.player === 5) {
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
      document.querySelector("#round-result").removeAttribute("class");
      document
        .querySelector("#round-result")
        .removeChild(document.querySelector("#restart"));
      document.querySelector("#round-result").textContent =
        "Choose Your Weapon";
    });
    document.querySelector("#round-result").textContent = "";
    document.querySelector("#round-result").appendChild(restart);
  }
}
