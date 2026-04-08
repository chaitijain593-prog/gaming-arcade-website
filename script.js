let cells = document.querySelectorAll(".cell");
const titleheader = document.querySelector("#titleheader");
const xplayerdisplay = document.querySelector("#xplayerdisplay");
const oplayerdisplay = document.querySelector("#oplayerdisplay");
const computer = document.querySelector("#computer");
let player = "X";
let ispausegame = false;
let isgamestart = false;
const restartbutton = document.querySelector(".restart");
const inputcells = ["", "", "", "", "", "", "", "", ""];
const winconditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapcell(cell, index));
});

function tapcell(cell, index) {
  if (cell.textContent === "" && !ispausegame) {
    isgamestart = true;
    updatecell(cell, index);
    if (!checkwin()) {
      changeplayer();
      if (player === "O" && computer.checked) {
        randomPick();
      }
    }
  }
}
function updatecell(cell, index) {
  cell.textContent = player;
  inputcells[index] = player;
  cell.style.color = player === "X" ? "#1892E0" : "#A737FF";
}
function changeplayer() {
  player = player === "X" ? "O" : "X";
}
function randomPick() {
  ispausegame = true;

  setTimeout(() => {
    const availableMoves = inputcells
      .map((val, idx) => (val === "" ? idx : null))
      .filter((val) => val !== null);

    if (availableMoves.length > 0 && ispausegame) {
      const randomIndex =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];

      updatecell(cells[randomIndex], randomIndex);

      if (!checkwin()) {
        changeplayer();
        ispausegame = false;
      }
    }
  }, 1000);
}

function checkwin() {
  for (const [a, b, c] of winconditions) {
    if (
      inputcells[a] == player &&
      inputcells[b] == player &&
      inputcells[c] == player
    ) {
      declarewinner([a, b, c]);
      return true;
    }
  }
  if (inputcells.every((cell) => cell !== "")) {
    declaredraw();
    return true;
  }
}
function declarewinner(winningindices) {
  titleheader.textContent = `Player ${player} wins!`;
  ispausegame = true;
  winningindices.forEach((index) => {
    cells[index].style.backgroundColor = "#2A2343";
  });
  restartbutton.style.visibility = "visible";
}
restartbutton.addEventListener("click", () => {
  restartbutton.style.visibility = "hidden";
  inputcells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  titleheader.textContent = "Choose";
  ispausegame = false;
  isgamestart = false;
});

function declaredraw() {
  titleheader.textContent = "It's a draw!";
  ispausegame = true;
  restartbutton.style.visibility = "visible";
}

function chooseplayer(selectedPlayer) {
  // Ensure the game hasn't started
  if (!isgamestart) {
    // Override the selected player value
    player = selectedPlayer;
    if (player === "X") {
      xplayerdisplay.classList.add("player-active");
      oplayerdisplay.classList.remove("player-active");
    } else {
      xplayerdisplay.classList.remove("player-active");
      oplayerdisplay.classList.add("player-active");
    }
  }
}
