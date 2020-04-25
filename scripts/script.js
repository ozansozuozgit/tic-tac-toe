const gameBoard = (() => {
  const row = 3;
  const col = 3;
  const gameArray = () => {
    return [...Array(row)].map(() => Array(col).fill(0));
  };
  return { gameArray };
})();

const displayBoard = ((gameArray) => {
  const container = document.createElement("div");
  container.id = "container";
  const display = () => {
    for (let i = 0; i < gameArray.length; i++) {
      for (k = 0; k < gameArray[i].length; k++) {
        const newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.setAttribute("data-cell", `${i}-${k}`);
        container.appendChild(newCell);
      }
    }
    document.querySelector("body").prepend(container);
  };
  return { display };
})(gameBoard.gameArray());

const Player = (name, id) => {
  const getName = () => name;
  const getId = () => id;
  let active = false;

  return { getName, active, id };
};

const displayController = (() => {
  const displaySelection = (cell) => {
    if (!cell.hasChildNodes()) {
      const img = document.createElement("img");
      img.src = "images/O.jpeg";
      cell.appendChild(img);
    } else console.log("bye");
  };
  return { displaySelection };
})();

document.querySelector("button").addEventListener("click", () => {
  // gameBoard.gameArray();
  displayBoard.display();
  document.querySelectorAll("[data-cell]").forEach((cell) =>
    cell.addEventListener("click", (e) => {
      displayController.displaySelection(e.target);
    })
  );
});

const Ozan = Player("Ozan", 1);
