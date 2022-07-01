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
    alert("It isn't a game element. Please enter again");
    return null;
  }

  if (playerSelection === computerSelection) {            // draw
    console.log(`Draw! ${gameElements[playerSelection]}`);
    alert(`Draw! ${gameElements[playerSelection]}`);
    return "draw";
  } else if (                                             // player win
    (playerSelection === 2 && computerSelection === 1) || // player : Scissors  , com : Paper
    (playerSelection === 1 && computerSelection === 0) || // player : Paper     , com : Rock
    (playerSelection === 0 && computerSelection === 2)    // player : Rock      , com : Scissors
  ) {
    console.log(
      `You win! ${gameElements[playerSelection]} beats ${gameElements[computerSelection]}`
    );
    alert(
      `You win! ${gameElements[playerSelection]} beats ${gameElements[computerSelection]}`
    );
    return "player";
  } else {                                                // com win
    console.log(
      `You Lose! ${gameElements[computerSelection]} beats ${gameElements[playerSelection]}`
    );
    alert(
      `You Lose! ${gameElements[computerSelection]} beats ${gameElements[playerSelection]}`
    );
    return "computer";
  }
}

function game() {
  let scores = { player: 0, computer: 0 };
  for (let i = 0; i < 5; i++) {
    let playerSelection, result;
    console.log(`%cRound ${i + 1} :`,"font-weight: bold");
    do {
      playerSelection = prompt(`Round ${i + 1} : Rock / Paper / Scissors ?`);
      result = playRound(playerSelection, computerPlay());
      if (result && !result.includes("draw")) scores[result] += 1;
    } while (result === null);
  }
  console.log("%c--------------------------------------","color: lightgray")
  console.log("%cScore:","font-weight: bold", scores);
  console.log(
    "%cResult: ","font-weight: bold",
    scores.player === scores.computer
    ? "Draw"
    : scores.player > scores.computer
    ? "You win!"
    : "You Lose"
    );
    console.log("%c--------------------------------------","color: lightgray")
}
