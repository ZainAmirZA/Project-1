// console.log("This is set up")


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

  [27, 28, 29],
  [30, 31, 32],
  [33, 34, 35],
  [27, 30, 33],
  [28, 31, 34],
  [29, 32, 35],
  [27, 31, 35],
  [29, 31, 33],

  [36, 37, 38],
  [39, 40, 41],
  [42, 43, 44],
  [36, 39, 42],
  [37, 40, 43],
  [38, 41, 44],
  [36, 40, 44],
  [38, 40, 42],

  [45, 46, 47],
  [48, 49, 50],
  [51, 52, 53],
  [45, 48, 51],
  [46, 49, 52],
  [47, 50, 53],
  [45, 49, 53],
  [47, 49, 51],

  [54, 55, 56],
  [57, 58, 59],
  [60, 61, 62],
  [54, 57, 60],
  [55, 58, 61],
  [56, 59, 62],
  [54, 58, 62],
  [56, 58, 60],

  [63, 64, 65],
  [66, 67, 68],
  [69, 70, 71],
  [63, 66, 69],
  [64, 67, 70],
  [65, 68, 71],
  [63, 67, 71],
  [65, 67, 69],

  [72, 73, 74],
  [75, 76, 77],
  [78, 79, 80],
  [72, 75, 78],
  [73, 76, 79],
  [74, 77, 80],
  [72, 76, 80],
  [74, 76, 78],
]

const WINNING_FINALS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
const cellElements = document.querySelectorAll('[data-cell]')
const bigCellElements = document.querySelectorAll('[data-big]')
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

board.addEventListener('click', function(e){
  let clicked = e.path
  console.log(clicked)
})


// In Click must place a mark, check for a win, check for a draw, switch turns
function takeClick(e) {
  const cell = e.target
  if (cell.classList.contains('disabled')) return
  const bigCell = e.path[1]
  // console.log(bigCell.childNodes)
  const currentClass = oTurn ? O_CLASS : X_CLASS
  placeMark(cell, currentClass)
  
  if (checkWin(currentClass)) {
    //Remove all classes from cells in that  big cell
    bigCell.childNodes.forEach((childCell, idx) => {
      
      if (idx % 2 !== 0 ) {
      childCell.classList.remove("x","o")
      childCell.classList.add('disabled')
      console.log(childCell)
      }
      
    }) 

    placeBigMark(bigCell, currentClass)
  }
  if (checkBigWin(currentClass)) {
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

//Function to add a big mark upon winning grid
function placeBigMark(bigCell, currentClass) {
  bigCell.classList.remove(X_CLASS)
  bigCell.classList.remove(O_CLASS)
  bigCell.classList.add(currentClass)
  bigCell.classList.add('highlight')
}

function checkSubWin(bigCell, currentClass) {
   
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

//Check if ANY of the winning combinations are met on the small board
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

//Check if the big boards fit the winning combinations
function checkBigWin(currentClass) {
  return WINNING_FINALS.some(combination => {
    return combination.every(index => {
      console.log(bigCellElements[index].querySelector(`.${currentClass}`))
      return bigCellElements[index].querySelector(`.sub-board.${currentClass}`)
      
      // .classList.contains(currentClass)
    })
  })
}