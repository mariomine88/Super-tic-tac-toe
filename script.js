const board = document.getElementById("board");
const cells = [];

let currentPlayer = "X";
let scores = { X: 0, O: 0 };

function checkWin(player) {
    // Logic to check if the player has won
    // Return true if the player has won, otherwise false
}

function updateScores() {
    document.getElementById("scoreX").textContent = scores.X;
    document.getElementById("scoreO").textContent = scores.O;
}

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        
        if (checkWin(currentPlayer)) {
            scores[currentPlayer]++;
            updateScores();
            resetBoard();
        } else if (cells.every(cell => cell.textContent !== "")) {
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("playerX").classList.toggle("active");
            document.getElementById("playerO").classList.toggle("active");
        }
    }
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    document.getElementById("playerX").classList.add("active");
    document.getElementById("playerO").classList.remove("active");
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleClick);
        cells.push(cell);
        board.appendChild(cell);
    }
    document.getElementById("playerX").classList.add("active");
}

createBoard();
