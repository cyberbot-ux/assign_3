const board = document.getElementById('board');
const status = document.getElementById('status');
const score = document.getElementById('score');
let cells = [];
let isXTurn = true;
let isGameOver = false;
let mode = 'pvp';
let xWins = 0, oWins = 0, draws = 0;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => cellClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
  isXTurn = true;
  isGameOver = false;
  status.textContent = "X's Turn";
}

function cellClick(i) {
  if (isGameOver || cells[i].textContent) return;
  cells[i].textContent = isXTurn ? 'X' : 'O';
  if (checkWinner(isXTurn ? 'X' : 'O')) {
    handleEnd(isXTurn ? 'X Wins' : 'O Wins');
  } else if (isDraw()) {
    handleEnd("It's a Draw");
  } else {
    isXTurn = !isXTurn;
    status.textContent = isXTurn ? "X's Turn" : "O's Turn";
    if (!isXTurn && mode === 'ai') aiMove();
  }
}

function aiMove() {
  let empty = cells.map((c, i) => c.textContent === '' ? i : null).filter(i => i !== null);
  let move = empty[Math.floor(Math.random() * empty.length)];
  setTimeout(() => cellClick(move), 300);
}

function checkWinner(p) {
  const combos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return combos.some(([a,b,c]) => cells[a].textContent === p && cells[b].textContent === p && cells[c].textContent === p);
}

function isDraw() {
  return cells.every(c => c.textContent);
}

function handleEnd(msg) {
  isGameOver = true;
  status.textContent = msg;
  if (msg.includes('X')) xWins++;
  else if (msg.includes('O')) oWins++;
  else draws++;
  score.textContent = `X Wins: ${xWins} | O Wins: ${oWins} | Draws: ${draws}`;
  setTimeout(createBoard, 2000);
}

function startGame(selectedMode) {
  mode = selectedMode;
  createBoard();
}

createBoard();