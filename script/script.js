console.log("I hate setting this up")


const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],

  [9, 10, 11],
  [12, 13, 14],
  [15, 16, 17],
  [9, 12, 15],
  [10, 13, 16],
  [11, 14, 17],
  [9, 13, 17],
  [11, 13, 15],

  [18, 19, 20],
  [21, 22, 23],
  [24, 25, 26],
  [18, 21, 24],
  [19, 22, 25],
  [20, 23, 26],
  [18, 22, 26],
  [20, 22, 24],

  [27, 26, 29],
  [30, 31, 32],
  [33, 34, 35],
  [27, 30, 33],
  [28, 31, 34],
  [29, 32, 35],
  [27, 31, 35],
  [29, 31, 33],
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winScreenElement = document.getElementById('winScreen')
const restartButton = document.getElementById('restartButton')
const winScreenTextElement = document.querySelector('[data-win-screen-text]')
let oTurn = true

startGame()

//Build restart into startGame
restartButton.addEventListener('click', startGame)

//Remove previous marks, Only Allow a single click per cell, remove winners message
function startGame() {
  oTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', takeClick)
    cell.addEventListener('click', takeClick, { once: true })
  })
  setBoardHoverClass()
  winScreenElement.classList.remove('show') 
}

// In Click must place a mark, check for a win, check for a draw, switch turns
function takeClick(e) {
  const cell = e.target
  const currentClass = oTurn ? O_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

//At the end of game show the win-screen or draw message - write whatt should be inserted in the winning message
function endGame(draw) {
  if (draw) {
    winScreenTextElement.innerText = 'Draw!'
  } else {
    winScreenTextElement.innerText = `${oTurn ? "O" : "X"} Wins!`
  }
  winScreenElement.classList.add('show')
}

//Check if all cells are full with classes 
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}

//Function to add the mark upon click aka add the class of X or O to the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//When called just swap 
function swapTurns() {
  oTurn = !oTurn
}

//ONLY CALL RIGHT AFTER SWAPTURNS
//removes the class to add them in hover state
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  if (oTurn) {
    board.classList.add(O_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

//Check if ANY of the winning combinations are met on the board
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

