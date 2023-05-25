let checkers = document.querySelectorAll(".checker");
let cells = document.querySelectorAll(".cell");
let turn = document.querySelector(".turn");
let winner = document.querySelector(".winner");
let currentChecker;
let currentCheckerDraggedCell;
let firstTwoMoves = [];
let initialAllowedMoves = [];
let newPositon = [];
let playerOne = "white-checker";
let playerTwo = "black-checker";
let currentPlayer = playerOne;
let gameFinished = false;
let playWithComputer = false;
let pvp = document.querySelector(".people");
let pvc = document.querySelector(".computer");
let chessBoard = document.querySelector(".chess-board");
let info = document.querySelector(".info");
let mainMenu = document.querySelector(".mainMenu");
let dropAudio = document.querySelector("#dropAudio");
let menuAudio = document.querySelector("#menuAudio");
let gameWin = document.querySelector("#gameWin");
let declare = document.querySelector(".declare");
let p2 = document.querySelector(".p2");
let p1 = document.querySelector(".p1");
let p1Score = 1;
let p2Score = 1;

checkers.forEach((checker) => {
  checker.setAttribute("isKing", false);

  checker.addEventListener("dragstart", (event) => {
    setTimeout(() => checker.classList.add("dragged"), 1);
    currentChecker = event.target;
    currentCheckerDraggedCell = event.target.parentElement;
    let draggedCellID = currentCheckerDraggedCell.id;
    let draggedCheckerType = event.target.classList[1];
    let isKing = currentChecker.getAttribute("isKing") == "true" ? true : false;
    let currentCheckerColor = currentChecker.classList[1];
    if (currentPlayer == playerOne && currentCheckerColor == playerOne) {
      (isKing)
        ? kingMoves(draggedCellID, draggedCheckerType)
        : whitePawnMoves(draggedCellID, draggedCheckerType);
    } else if (currentPlayer == playerTwo && currentCheckerColor == playerTwo) {
      (isKing)
        ? kingMoves(draggedCellID, draggedCheckerType)
        : blackPawnMoves(draggedCellID, draggedCheckerType);
    }
    showHint();
  });

  checker.addEventListener("dragend", () =>
    checker.classList.remove("dragged")
  );
});

function kingMoves(idString, checkerType) {
  findNextTwoMoveForWhiteChecker(idString);
  checkEnemyForWhiteChecker(checkerType);
  firstTwoMoves = [];
  findNextTwoMoveForBlackChecker(idString);
  checkEnemyForBlackChecker(checkerType);
}

function whitePawnMoves(idString, checkerType) {
  findNextTwoMoveForWhiteChecker(idString);
  checkEnemyForWhiteChecker(checkerType);
}

function blackPawnMoves(idString, checkerType) {
  findNextTwoMoveForBlackChecker(idString);
  checkEnemyForBlackChecker(checkerType);
}

function findNextTwoMoveForWhiteChecker(idString) {
  let id = idString.split(",");
  let row = Number(id[0]);
  let col = Number(id[1]);
  firstTwoMoves.push(`${row + 1},${col - 1}`);
  firstTwoMoves.push(`${row + 1},${col + 1}`);
}

function findNextTwoMoveForBlackChecker(idString) {
  let id = idString.split(",");
  let row = Number(id[0]);
  let col = Number(id[1]);
  firstTwoMoves.push(`${row - 1},${col - 1}`);
  firstTwoMoves.push(`${row - 1},${col + 1}`);
}

function checkEnemyForWhiteChecker(checkerType) {
  let leftCell = document.getElementById(`${firstTwoMoves[0]}`);
  if (leftCell != null && !leftCell.hasChildNodes()) {
    initialAllowedMoves.push(firstTwoMoves[0]);
  } else if (leftCell != null && leftCell.hasChildNodes()) {
    let id = firstTwoMoves[0].split(",");
    let row = Number(id[0]);
    let col = Number(id[1]);
    let childColor = leftCell.childNodes[0].classList[1];
    let nextmoveId = document.getElementById(`${row + 1},${col - 1}`);
    (nextmoveId != null &&
      !nextmoveId.hasChildNodes() &&
      childColor != checkerType)
      ? newPositon.push({
        id: `${row + 1},${col - 1}`,
        otherPawn: leftCell.children[0],
        otherPawnColor: leftCell.childNodes[0].classList[1],
      })
      : false;
  }

  let rightCell = document.getElementById(`${firstTwoMoves[1]}`);
  if (rightCell != null && !rightCell.hasChildNodes()) {
    initialAllowedMoves.push(firstTwoMoves[1]);
  } else if (rightCell != null && rightCell.hasChildNodes()) {
    let id = firstTwoMoves[1].split(",");
    let row = Number(id[0]);
    let col = Number(id[1]);
    let childColor = rightCell.childNodes[0].classList[1];
    let nextmoveId = document.getElementById(`${row + 1},${col + 1}`);
    (nextmoveId != null &&
      !nextmoveId.hasChildNodes() &&
      childColor != checkerType)
      ? newPositon.push({
        id: `${row + 1},${col + 1}`,
        otherPawn: rightCell.children[0],
        otherPawnColor: rightCell.childNodes[0].classList[1],
      })
      : false;
  }
}

function checkEnemyForBlackChecker(checkerType) {
  let leftCell = document.getElementById(`${firstTwoMoves[0]}`);
  if (leftCell != null && !leftCell.hasChildNodes()) {
    initialAllowedMoves.push(firstTwoMoves[0]);
  } else if (leftCell != null && leftCell.hasChildNodes()) {
    let id = firstTwoMoves[0].split(",");
    let row = Number(id[0]);
    let col = Number(id[1]);
    let childColor = leftCell.childNodes[0].classList[1];
    let nextmoveId = document.getElementById(`${row - 1},${col - 1}`);
    (nextmoveId != null &&
      !nextmoveId.hasChildNodes() &&
      childColor != checkerType)
      ? newPositon.push({
        id: `${row - 1},${col - 1}`,
        otherPawn: leftCell.children[0],
        otherPawnColor: leftCell.childNodes[0].classList[1],
      })
      : false;
  }

  let rightCell = document.getElementById(`${firstTwoMoves[1]}`);
  if (rightCell != null && !rightCell.hasChildNodes()) {
    initialAllowedMoves.push(firstTwoMoves[1]);
  } else if (rightCell != null && rightCell.hasChildNodes()) {
    let id = firstTwoMoves[1].split(",");
    let row = Number(id[0]);
    let col = Number(id[1]);
    let childColor = rightCell.childNodes[0].classList[1];
    let nextmoveId = document.getElementById(`${row - 1},${col + 1}`);
   ( nextmoveId != null &&
      !nextmoveId.hasChildNodes() &&
      childColor != checkerType)
      ? newPositon.push({
        id: `${row - 1},${col + 1}`,
        otherPawn: rightCell.children[0],
        otherPawnColor: rightCell.childNodes[0].classList[1],
      })
      : false;
  }
}

cells.forEach((cell) => {
  cell.addEventListener("dragover", (event) => event.preventDefault());

  cell.addEventListener("drop", (event) => {
    dropAudio.play();
    let currentCheckerColor = currentChecker.classList[1];
    let isThereOtherPosition = newPositon.some(
      (position) => position.id == cell.id
    );
    removeHint();

    if (initialAllowedMoves.includes(cell.id)) {
      event.target.append(currentChecker);
      currentPlayer = currentCheckerColor == playerOne ? playerTwo : playerOne;
      if (currentCheckerColor == playerOne) {
        turn.innerHTML = "BLACK!";
        (playWithComputer) ? setTimeout(computer, 1500): false;
      } else {
        turn.innerHTML = "WHITE!";
      }
    }

    if (isThereOtherPosition) {
      let newPositionIndex = newPositon.findIndex(
        (position) => position.id == cell.id
      );
      let otherPawn = (newPositionIndex != -1) ? newPositon[newPositionIndex].otherPawn : undefined;
      let isKing = currentChecker.getAttribute("isKing") == "true" ? true : false;
      otherPawn.remove();
      if(currentChecker.classList[1] == playerOne){
        p1.innerText = p1Score;
        p1Score++;
      }else{
        p2.innerText = p2Score;
        p2Score++;
        
      }  
      event.target.append(currentChecker);
      firstTwoMoves = [];
      initialAllowedMoves = [];
      newPositon = [];
      if (currentCheckerColor == playerOne) {
        isKing
          ? kingMoves(cell.id, currentCheckerColor)
          : whitePawnMoves(cell.id, currentCheckerColor);
        currentPlayer = newPositon.length > 0 ? playerOne : playerTwo;
        if (newPositon.length > 0) {
          turn.innerHTML = "WHITE!";
        } else {
          turn.innerHTML = "BLACK!";
          (playWithComputer) ? setTimeout(computer, 1500): false;
        }
      } else if (currentCheckerColor == playerTwo) {
        isKing
          ? kingMoves(cell.id, currentCheckerColor)
          : blackPawnMoves(cell.id, currentCheckerColor);
        currentPlayer = newPositon.length > 0 ? playerTwo : playerOne;
        if (newPositon.length > 0) {
          turn.innerHTML = "BLACK!";
          (playWithComputer) ? setTimeout(computer, 1500): false;
        } else {
          turn.innerHTML = "WHITE!";
        }
      }

      newPositon.forEach((position) => {
        let cell = document.getElementById(position.id);
        if (cell != null) cell.style.backgroundColor = "skyblue";
      });
    }
    kingCheck(cell.id);
    winCheck(); 
    stuckCheck();
    firstTwoMoves = [];
    initialAllowedMoves = [];
    newPositon = [];
  });
});

function showHint() {
  initialAllowedMoves.forEach((id) => {
    let cell = document.getElementById(id);
    if (cell != null) cell.style.backgroundColor = "skyblue";
  });

  newPositon.forEach((position) => {
    let cell = document.getElementById(position.id);
    if (cell != null) cell.style.backgroundColor = "skyblue";
  });
}

function removeHint() {
  cells.forEach((cell) => {
    let idArray = cell.id.split(",");
    let row = idArray[0];
    let col = idArray[1];
    if (row % 2 != 0 && col % 2 != 0) cell.style.backgroundColor = "rgba(207, 53, 41, 1)";
    else if (row % 2 != 0 && col % 2 == 0) cell.style.backgroundColor = "white";
    else if (row % 2 == 0 && col % 2 != 0) cell.style.backgroundColor = "white";
    else if (row % 2 == 0 && col % 2 == 0) cell.style.backgroundColor = "rgba(207, 53, 41, 1)";
  });
}

function kingCheck(id) {
  let currentCheckerColor = currentChecker.classList[1];
  let idArray = id.split(",");
  let row = Number(idArray[0]);
  let col = Number(idArray[1]);
  const kingColForWhiteChecker = [2,4,6,8];
  const kingColForBlackChecker = [1,3,5,7];
  
  if (currentCheckerColor == playerOne && row == 8 && kingColForWhiteChecker.includes(col))
    setTimeout(()=> currentChecker.setAttribute("isKing", true), 0.0003)
  else if (currentCheckerColor == playerTwo && row == 1 && kingColForBlackChecker.includes(col))
    setTimeout(()=> currentChecker.setAttribute("isKing", true), 0.0003)
}

function removeDraggable() {
  checkers.forEach(checker => {
    checker.setAttribute('draggable', 'false');
  })
}

function winCheck() {
  let blackCheckers = document.querySelectorAll(".black-checker");
  let whiteCheckers = document.querySelectorAll(".white-checker");
  if (blackCheckers.length == 0) {
    winner.innerHTML = "Player One Win!";
    removeDraggable();
    gameWin.play();
    declare.style.display = "block";
    chessBoard.style.display = "none";
    mainMenu.style.display = "none";
    info.style.display = "none";

  } else if (whiteCheckers.length == 0) {
    winner.innerHTML = "Player Two Win!";
    removeDraggable();
    gameWin.play();
    declare.style.display = "block";
    chessBoard.style.display = "none";
    mainMenu.style.display = "none";
    info.style.display = "none";
  }
  
}

function stuckCheck() {
  let currentCheckerColor = currentChecker.classList[1];
  let whiteCheckers = document.querySelectorAll(".white-checker");
  let blackCheckers = document.querySelectorAll(".black-checker");
  let moveable = false;

  if(currentCheckerColor == playerTwo) {
    for (let index = 0; index < whiteCheckers.length; index++) {
      firstTwoMoves = [];
      initialAllowedMoves = [];
      newPositon = [];
      findNextTwoMoveForWhiteChecker(whiteCheckers[index].parentElement.id);
      checkEnemyForWhiteChecker(playerOne);
      if (initialAllowedMoves.length != 0 || newPositon.length != 0) {
        moveable = true;
        break;
      }
    }
  
    if(!moveable) {
      winner.innerHTML = "Player Two Win!";
      removeDraggable();
      gameWin.play();
      declare.style.display = "block";
      chessBoard.style.display = "none";
      mainMenu.style.display = "none";
      info.style.display = "none";
    }

  } else {
    for (let index = 0; index < blackCheckers.length; index++) {
      firstTwoMoves = [];
      initialAllowedMoves = [];
      newPositon = [];
      findNextTwoMoveForBlackChecker(blackCheckers[index].parentElement.id);
      checkEnemyForBlackChecker(playerTwo);
      if (initialAllowedMoves.length != 0 || newPositon.length != 0) {
        moveable = true;
        break;
      }
    }
  
    if(!moveable) {
      winner.innerHTML = "Player One Win!";
      removeDraggable();
      gameWin.play();
      declare.style.display = "block";
      chessBoard.style.display = "none";
      mainMenu.style.display = "none";
      info.style.display = "none";
    }
  }
}

function computer() {
  let blackCheckers = document.querySelectorAll(".black-checker");
  const dragStartEvent = new Event("dragstart");
  const dragEndEvent = new Event("dragend");
  const dropEvent = new Event("drop");

  let isThereEnemy = false;
  blackCheckers.forEach((checker) => {
    firstTwoMoves = [];
    initialAllowedMoves = [];
    newPositon = [];
    checker.dispatchEvent(dragStartEvent);
    
    checker.style.opacity = "1";
    if (newPositon.length > 0) {
      let randomIndex = Math.floor(Math.random() * newPositon.length);
      checker.dispatchEvent(dragEndEvent);
      document.getElementById(newPositon[randomIndex].id).dispatchEvent(dropEvent);
      kingCheck(newPositon[randomIndex].id);
      isThereEnemy = true;
      return;
    }
    checker.dispatchEvent(dragEndEvent);
  });

  if (!isThereEnemy) {
    do {
      firstTwoMoves = [];
      initialAllowedMoves = [];
      newPositon = [];
      var randomChecker = Math.floor(Math.random() * blackCheckers.length);
      blackCheckers[randomChecker].dispatchEvent(dragStartEvent);
      blackCheckers[randomChecker].dispatchEvent(dragEndEvent);
      blackCheckers[randomChecker].style.opacity = "1";
    } while (initialAllowedMoves.length == 0);
    let randomIndex = Math.floor(Math.random() * initialAllowedMoves.length);
    document.getElementById(initialAllowedMoves[randomIndex]).dispatchEvent(dropEvent);
  }
}

pvp.addEventListener('click',()=>{
  chessBoard.style.display = "flex";
  info.style.display = "flex";
  mainMenu.style.display = "none";
  menuAudio.play();
  playWithComputer = false;
});

pvc.addEventListener('click',()=>{
  chessBoard.style.display = "flex";
  info.style.display = "flex";
  mainMenu.style.display = "none";
  menuAudio.play();
  playWithComputer = true;
});

let exitLink = document.getElementById("exitLink");
    exitLink.addEventListener("click", () => {
      window.close();
    });

