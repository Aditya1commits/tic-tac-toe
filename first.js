let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O's turn; false = X's turn
let count = 0;    // To track number of moves (for draw detection)

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset everything back to initial state
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Disable all box buttons
const disableBoxes = () => {
  boxes.forEach(box => (box.disabled = true));
};

// Enable all box buttons and clear their text
const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffc7"; // restore original background
  });
};

// Show draw message
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Show winner message and optionally highlight the winning pattern
const showWinner = (winner, patternIndexes = []) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  // Highlight winning pattern (if provided)
  if (patternIndexes.length === 3) {
    patternIndexes.forEach(i => {
      boxes[i].style.backgroundColor = "#90ee90"; // light green
    });
  }

  disableBoxes();
};

// Check if any win pattern is satisfied
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val, pattern);
      return true;
    }
  }
  return false;
};

// Attach click listeners to each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // If it's O's turn
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      // X's turn
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Attach listeners to Reset and New Game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initialize on load
resetGame();
