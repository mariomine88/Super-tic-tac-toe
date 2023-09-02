const cells = document.querySelectorAll('.box');
const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;
let scores = {
    [playerX]: 0,
    [playerO]: 0
};

function checkWin(player) {
    // Define winning combinations
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    // Check each winning combination
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === player
        ) {
            document.getElementById(a).style.background = "rgba(255, 255, 255, 0.5)";
            document.getElementById(b).style.background = "rgba(255, 255, 255, 0.5)";
            document.getElementById(c).style.background = "rgba(255, 255, 255, 0.5)";
            return true; // Player wins
        }
    }

    return false; // Player doesn't win
}


function updateScores() {
    document.getElementById("scoreX").textContent = scores[playerX];
    document.getElementById("scoreO").textContent = scores[playerO];
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = ""; // Clear cell content
        cell.style.background = "rgb(0,0,0)"; 
    });

    currentPlayer = playerX; // Reset to Player X's turn
    document.getElementById("playerX").classList.add("active");
    document.getElementById("playerO").classList.remove("active");
}


function handleClick(event) {
    const cell = event.target;
    if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        
        if (checkWin(currentPlayer)) {
            scores[currentPlayer]++;
            updateScores();

        } else if (Array.from(cells).every(cell => cell.textContent !== "")) {
            resetBoard();
        } else {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
            document.getElementById("playerX").classList.toggle("active");
            document.getElementById("playerO").classList.toggle("active");
        }
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
