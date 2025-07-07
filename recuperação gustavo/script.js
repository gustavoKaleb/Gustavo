const game = document.getElementById("game");
const toggleThemeBtn = document.getElementById("toggleTheme");
const toggleThemeStartBtn = document.getElementById("toggleThemeStart");
const winMessage = document.getElementById("winMessage");
const timeoutMessage = document.getElementById("timeoutMessage");
const timerElement = document.getElementById("time");
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const overlay = document.getElementById("overlay");
const restartButton = document.getElementById("restartButton");
const restartTimeoutButton = document.getElementById("restartTimeoutButton");

const map = [
  "############",
  "#     #    #",
  "# ### # ## #",
  "# #   # #  #",
  "# # ### ## #",
  "# #     #  #",
  "# ### ### ##",
  "#     #G   #",
  "############"
];

let playerStart = { x: 1, y: 1 };
let playerPos = { ...playerStart };
let timeLeft = 15;
let timerInterval;
let gameActive = false;

function drawMap() {
  game.innerHTML = "";
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (x === playerPos.x && y === playerPos.y) {
        cell.classList.add("player");
        cell.textContent = "🐀";
      } else if (map[y][x] === "#") {
        cell.classList.add("wall");
      } else if (map[y][x] === "G") {
        cell.classList.add("goal");
        cell.textContent = "🧀";
      }

      game.appendChild(cell);
    }
  }
}

function resetGame() {
  playerPos = { ...playerStart };
  winMessage.classList.add("hidden");
  timeoutMessage.classList.add("hidden");
  overlay.classList.add("hidden");
  winMessage.style.display = "none";
  timeoutMessage.style.display = "none";
  overlay.style.display = "none";

  drawMap();
  clearInterval(timerInterval);
  timeLeft = 15;
  timerElement.textContent = timeLeft;
  gameActive = false;
  document.removeEventListener("keydown", handleKeydown);
}

function startTimer() {
  timerElement.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      document.removeEventListener("keydown", handleKeydown);
      timeoutMessage.classList.remove("hidden");
      timeoutMessage.style.display = "block";
      overlay.classList.remove("hidden");
      overlay.style.display = "block";
    }
  }, 1000);
}

function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  resetGame();
  drawMap();
  document.addEventListener("keydown", handleKeydown);
  startTimer();
  gameActive = true;
}

startButton.addEventListener("click", startGame);

restartWinButton.addEventListener("click", () => {
  resetGame();
  startGame();
});

restartTimeoutButton.addEventListener("click", () => {
  resetGame();
  startGame();
});

function movePlayer(dx, dy) {
  if (!gameActive) return;

  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if (map[newY] && map[newY][newX] !== "#") {
    playerPos.x = newX;
    playerPos.y = newY;
    drawMap();

    if (map[newY][newX] === "G") {
      clearInterval(timerInterval);
      gameActive = false;
      document.removeEventListener("keydown", handleKeydown);

      winMessage.classList.remove("hidden");
      winMessage.style.display = "block";
      overlay.classList.remove("hidden");
      overlay.style.display = "block";
    }
  }
}

function handleKeydown(e) {
  if (e.key === "ArrowUp") movePlayer(0, -1);
  if (e.key === "ArrowDown") movePlayer(0, 1);
  if (e.key === "ArrowLeft") movePlayer(-1, 0);
  if (e.key === "ArrowRight") movePlayer(1, 0);
}


toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

toggleThemeStartBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleThemeStartBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

drawMap();