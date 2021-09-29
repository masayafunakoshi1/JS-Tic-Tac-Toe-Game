//Connects to HTML Div with class "game-status"
const statusDisplay = document.querySelector(".game-status");

//Variables

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn'`;
//Displays message of who's turn it is
statusDisplay.innerHTML = currentPlayerTurn();

//All winning combinations for both players
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Show "X" and "O" on UI and store clicked cell in gameState = []
const handleCellPlayed = (clickedCell, clickedCellIndex) => {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};
const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
};

const handleResult = () => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  //We will check whether there are any values in the game state array that aren't populated with "X" or "O"

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  //If we get to here within the codeblock, we know that noone has won the game yet, so we continue
  handlePlayerChange();
};

//When cell is clicked get targeted cell's index and info stored into const and validate if game is still going/playable
//Call functions handleCellPlayed and handleResult to show "X" and "O" on UI
const handleCellClicked = (event) => {
  const clickedCell = event.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResult();

  console.log(clickedCell, clickedCellIndex);
};

//Restart game by setting gameActive to true, player "X" starts the game, gameState reset to array of empty strings, currentPlayerTurn is set to "X" again, and each ".cell" class element innerHTML is reset to a blank string
const handleRestartGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  console.log("Restarted Game");
};

//Connecting HTML doc to addEventListeners to listen for clicks on cells and game restarts
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClicked));
document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);
