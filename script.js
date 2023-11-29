let mainBoard = document.getElementById('tic-tac-toe-board');
let scoreElement = document.getElementById('score');

for (let i = 0; i < 9; i++) {
    let board = document.createElement('div');
    board.className = 'board';
    board.id = 'board-' + i;
    for (let j = 0; j < 9; j++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        board.appendChild(cell);
    }
    mainBoard.insertBefore(board, scoreElement);
}

let boards = Array(9).fill().map(() => Array(9).fill(null));
let turn = 'X';
let score = { X: 0, O: 0 };
let nextBoard = null;

function checkWin(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let line of lines) {
        if (board[line[0]] && board[line[0]] === board[line[1]] && board[line[0]] === board[line[2]]) {
            return board[line[0]];
        }
    }
    return null;
}

function updateScore() {
    document.getElementById('score').textContent = `X: ${score.X}, O: ${score.O}`;
}

document.querySelectorAll('.board').forEach((boardElement, boardIndex) => {
    boardElement.querySelectorAll('.cell').forEach((cell, cellIndex) => {
        cell.addEventListener('click', () => {
            if (!boards[boardIndex][cellIndex] && (nextBoard === null || nextBoard === boardIndex)) {
                boards[boardIndex][cellIndex] = turn;
                cell.textContent = turn;
                if (checkWin(boards[boardIndex])) {
                    score[turn]++;
                    updateScore();
                    boards[boardIndex] = Array(9).fill(null);
                    document.querySelectorAll(`#board-${boardIndex} .cell`).forEach(cell => {

                    });
                }
                nextBoard = cellIndex;
                turn = turn === 'X' ? 'O' : 'X';

                // Remove active-board class from all boards
                document.querySelectorAll('.board').forEach(board => {
                    board.classList.remove('active-board');
                });

                // Add active-board class to the next board
                if (nextBoard !== null) {
                    document.querySelectorAll('.board')[nextBoard].classList.add('active-board');
                }
            }
        });
    });
});

document.getElementById('reset').addEventListener('click', () => {
    boards = Array(9).fill().map(() => Array(9).fill(null));
    turn = 'X';
    nextBoard = null;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    score = { X: 0, O: 0 };
    updateScore();

    // Remove active-board class from all boards
    document.querySelectorAll('.board').forEach(board => {
        board.classList.remove('active-board');
    });
});