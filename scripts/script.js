const Player = (name, id, active = false) => {
  const getName = () => name;
  const getId = () => id;
  let ative = active;

  return { getName, getId, active };
};

const Player1 = Player("Ozan", 1, true);
const Player2 = Player("John", 2);

const playerArray = [Player1, Player2];

const gameBoard = (() => {
  const gameArray = [...Array(3)].map(() => Array(3).fill(0)); // 3 rows, 3 collumns
  const setArray = (row, col, value) => {
    if (!(gameArray[row][col] === 0)) return; // stop if cell is full
    gameArray[row][col] = value;
    console.table(gameArray);
  };

  return { gameArray, setArray };
})();

const displayController = (() => {
  // display winner as well

  const displayBoard = (gameArray) => {
    const container = document.querySelector("#container");
    container.style.display = "grid";
    for (let i = 0; i < 3; i++) {
      for (k = 0; k < 3; k++) {
        const newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.setAttribute("data-cell", `${i}${k}`);
        container.appendChild(newCell);
      }
    }
  };

  const displaySelection = (cell) => {
    if (cell.hasChildNodes()) return;
    const img = document.createElement("img");
    // console.log(Player1.getActive());
    img.src = Player1.active === true ? "images/X.png" : "images/O.jpeg";
    cell.appendChild(img);
  };
  return { displaySelection, displayBoard };
})();

const updateGame = (() => {
  const updateArray = (cell, gameBoard) => {
    const [row, col] = [...cell.attributes[1].value];
    const value = Player1.active === true ? "X" : "O";
    gameBoard.setArray(row, col, value);
    console.log(`row:${row} col:${col}`);
  };

  // Update Players
  const switchPlayers = () => {
    for (let player of playerArray) {
      player.active = !player.active;
    }
  };

  const checkWin = (gameArray) => {
    // Horizontal check
    for (let i = 0; i < 3; i++) {
      if (
        gameArray[i][0] !== 0 &&
        gameArray[i][0] === gameArray[i][1] &&
        gameArray[i][1] === gameArray[i][2]
      ) {
        console.log(`Winner is ${Player1.active === true ? Player1.getName() : Player2.getName()}`);
        // Return
      }
    }
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (
        gameArray[0][i] !== 0 &&
        gameArray[0][i] === gameArray[1][i] &&
        gameArray[1][i] === gameArray[2][i]
      ) {
        console.log(`Winner is ${Player1.active === true ? Player1.getName() : Player2.getName()}`);
      }
    }
    // Diagonal
    if (
      gameArray[0][0] !== 0 &&
      gameArray[0][0] === gameArray[1][1] &&
      gameArray[1][1] === gameArray[2][2]
    ) {
      console.log(`Winner is ${Player1.active === true ? Player1.getName() : Player2.getName()}`);
    }
    // Diagonal
    if (
      gameArray[2][0] !== 0 &&
      gameArray[2][0] === gameArray[1][1] &&
      gameArray[1][1] === gameArray[0][2]
    ) {
      console.log(`Winner is ${Player1.active === true ? Player1.getName() : Player2.getName()}`);
    }
  };

  return { updateArray, switchPlayers, checkWin };
})();

document.querySelector("button").addEventListener("click", () => {
  displayController.displayBoard(gameBoard.gameArray);
  document.querySelectorAll("[data-cell]").forEach((cell) =>
    cell.addEventListener("click", (e) => {
      // console.log(e);
      displayController.displaySelection(e.target);
      updateGame.updateArray(e.target, gameBoard);
      updateGame.checkWin(gameBoard.gameArray);
      updateGame.switchPlayers();
    })
  );
});
