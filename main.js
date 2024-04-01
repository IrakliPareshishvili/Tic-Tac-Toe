const gameBoard = document.getElementById('game-board');
const refreshBtn = document.getElementById('refresh-btn');
const winnerBtn = document.getElementById('winner-btn');

let currentPlayer = 'X';
let gameEnded = false;
let gameBoardState = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

function initGameBoard() {
  gameEnded = false;
  gameBoardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  winnerBtn.textContent = 'Winner: None';
  renderGameBoard();
}


function renderGameBoard() {
  gameBoard.innerHTML = '';
  gameBoardState.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => cellClick(index));
    gameBoard.appendChild(cell);
  });
}


function cellClick(index) {
  if (gameEnded || gameBoardState[index] !== '') return;

  gameBoardState[index] = currentPlayer;
  renderGameBoard();

  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoardState[a] !== '' &&
      gameBoardState[a] === gameBoardState[b] &&
      gameBoardState[a] === gameBoardState[c]
    ) {
      gameEnded = true;
      winnerBtn.textContent = `Winner: ${currentPlayer === 'X' ? 'Player 1' : 'Player 2'}`;
      break;
    }
  }
}

refreshBtn.addEventListener('click', initGameBoard);


initGameBoard();
