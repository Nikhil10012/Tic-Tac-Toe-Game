let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let draws = 0;

function handleClick(cell) {
  const index = Number(cell.id);
  if (!gameActive || board[index] !== null) return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWinner()) {
    gameActive = false;
    updateScore(currentPlayer);
    showPopup(`Player ${currentPlayer} wins!`);
  } else if (board.every(cell => cell !== null)) {
    gameActive = false;
    draws++;
    updateScore("draw");
    showPopup("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator();
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    document.getElementById("scoreX").innerText = scoreX;
  } else if (winner === "O") {
    scoreO++;
    document.getElementById("scoreO").innerText = scoreO;
  } else if (winner === "draw") {
    document.getElementById("drawCount").innerText = draws;
  }
}

function updateTurnIndicator() {
  document.getElementById("currentTurn").innerText = currentPlayer;
}

function showPopup(message) {
  document.getElementById("popupMessage").innerText = message;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  resetBoard();
}

function resetBoard() {
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "X";
  updateTurnIndicator();
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("X", "O");
  });
}

function resetGameAll() {
  resetBoard();
  scoreX = 0;
  scoreO = 0;
  draws = 0;
  document.getElementById("scoreX").innerText = scoreX;
  document.getElementById("scoreO").innerText = scoreO;
  document.getElementById("drawCount").innerText = draws;
}

updateTurnIndicator();
