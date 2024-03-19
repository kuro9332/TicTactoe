let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = 'O'; // Player O starts
let count = 0; // To track draw
const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8]
];

// Initialize the game
function initializeGame() {
  currentPlayer = 'O';
  count = 0;
  enableBoxes();
  hideMessage();
}

// Function to switch players
function switchPlayer() {
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
}

// Function to check for a winner
function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
      return true;
    }
  }
  return false;
}

// Function to handle box clicks
function handleBoxClick(box) {
  box.innerText = currentPlayer;
  box.disabled = true;
  count++;
  
  if (checkWinner()) {
    showMessage(`Congratulations, Winner is ${currentPlayer}`);
    disableBoxes();
  } else if (count === 9) {
    showMessage(`Game was a Draw.`);
  } else {
    switchPlayer();
  }
}

// Function to handle a draw
function gameDraw() {
  showMessage(`Game was a Draw.`);
  disableBoxes();
}

// Function to show a message
function showMessage(message) {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
}

// Function to hide the message
function hideMessage() {
  msgContainer.classList.add("hide");
}

// Function to disable all boxes
function disableBoxes() {
  for (let box of boxes) {
    box.disabled = true;
  }
}

// Function to enable all boxes
function enableBoxes() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

// Event listeners
boxes.forEach(box => {
  box.addEventListener("click", () => handleBoxClick(box));
});

newGameBtn.addEventListener("click", initializeGame);
resetBtn.addEventListener("click", initializeGame);

// Initialize the game
initializeGame();
