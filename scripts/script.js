const Player = (name, id, active = false) => {
  const getName = () => name;
  const getId = () => id;

  return { getName, getId, active };
};

const gameBoard = (() => {
  let playerArray = [];
  const getPlayers = () => playerArray;
  const setPlayers = () => {
    playerArray = [];
    const [player1Name, player2Name] = document.querySelectorAll("input");
    const Player1 = Player(player1Name.value, 1, true);
    const Player2 = Player(player2Name.value, 2);
    playerArray.push(Player1, Player2);
  };

  let gameArray = [];
  // 3 rows, 3 columns
  const createArray = () => (gameArray = [...Array(3)].map(() => Array(3).fill(0)));
  const setArray = (row, col, value) => {
    if (!(gameArray[row][col] === 0)) return; // stop if cell is full
    gameArray[row][col] = value;
  };
  const getArray = () => gameArray;

  return { gameArray, setArray, playerArray, setPlayers, getPlayers, getArray, createArray };
})();

const displayController = (() => {
  const container = document.querySelector("#container");

  const displayBoard = () => {
    container.style.display = "grid";
    for (let i = 0; i < 3; i++) {
      for (k = 0; k < 3; k++) {
        const newCell = document.createElement("div");
        newCell.setAttribute("data-cell", `${i}${k}`);
        container.appendChild(newCell);
      }
    }
  };

  const hideBoard = () => {
    container.style.display = "none";
  };

  const displaySelection = (cell) => {
    if (cell.hasChildNodes()) return;
    const img = document.createElement("img");
    img.src = gameBoard.getPlayers()[0].active === true ? "images/X.png" : "images/O.png";
    cell.appendChild(img);
  };

  const displayWinner = (player) => {
    const displayResult = document.querySelector("#display-result");
    if (player === "draw") {
      displayResult.textContent = "It's a draw!";
      console.log("It's a draw!");
    } else {
      displayResult.textContent = `${player} wins!`;
    }
    updateGame.gameEnd = true;
    document.querySelector("#replay").style.display = "inline-block";
  };

  return { displaySelection, displayBoard, displayWinner, hideBoard };
})();

const updateGame = (() => {
  const gameEnd = false;

  const updateArray = (cell) => {
    const [row, col] = [...cell.attributes[0].value];
    const value = gameBoard.getPlayers()[0].active === true ? "X" : "O";
    gameBoard.setArray(row, col, value);
    console.log(`row:${row} col:${col}`);
  };

  // Update Players
  const switchPlayers = () => {
    for (const player of gameBoard.getPlayers()) {
      player.active = !player.active;
    }
  };

  return { updateArray, switchPlayers, gameEnd };
})();

const gameStatus = (() => {
  const checkWin = (gameArray) => {
    const currentPlayer =
      gameBoard.getPlayers()[0].active === true
        ? gameBoard.getPlayers()[0].getName()
        : gameBoard.getPlayers()[1].getName();
    // Horizontal check
    for (let i = 0; i < 3; i++) {
      if (
        gameArray[i][0] !== 0 &&
        gameArray[i][0] === gameArray[i][1] &&
        gameArray[i][1] === gameArray[i][2]
      )
        return displayController.displayWinner(currentPlayer);
    }
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (
        gameArray[0][i] !== 0 &&
        gameArray[0][i] === gameArray[1][i] &&
        gameArray[1][i] === gameArray[2][i]
      )
        return displayController.displayWinner(currentPlayer);
    }
    // Diagonal
    if (
      gameArray[0][0] !== 0 &&
      gameArray[0][0] === gameArray[1][1] &&
      gameArray[1][1] === gameArray[2][2]
    )
      return displayController.displayWinner(currentPlayer);

    // Diagonal
    if (
      gameArray[2][0] !== 0 &&
      gameArray[2][0] === gameArray[1][1] &&
      gameArray[1][1] === gameArray[0][2]
    )
      return displayController.displayWinner(currentPlayer);
    // Check for a draw. Original array contains all 0, if there are no winners and all the array
    // is filled with X and O, that would mean there are no 0's(empty spots) left
    if (!gameArray.some((row) => row.includes(0))) displayController.displayWinner("draw");
  };

  return { checkWin };
})();

document.querySelector("#btn-start").addEventListener("click", () => {
  // Initial setup
  displayController.displayBoard();
  gameBoard.setPlayers();
  gameBoard.createArray();
  // Begin interactions with game
  document.querySelector("#player-info-container").style.display = "none";
  document.querySelectorAll("[data-cell]").forEach((cell) =>
    cell.addEventListener("click", (e) => {
      if (updateGame.gameEnd) return;
      displayController.displaySelection(e.target);
      updateGame.updateArray(e.target);
      gameStatus.checkWin(gameBoard.getArray(), displayController);
      updateGame.switchPlayers();
    })
  );
});

document.querySelector("#replay").addEventListener("click", () => {
  // Reset values
  document.querySelector("#container").style.display = "none";
  document.querySelector("#container").innerHTML = "";
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  document.querySelector("#player-info-container").style.display = "block";
  document.querySelector("#display-result").textContent = "";
  gameBoard.gameArray = [];
  gameBoard.playerArray = [];
  updateGame.gameEnd = false;
  document.querySelector("#replay").style.display = "none";
});
