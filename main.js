// TODO: Make algorithm check from last click
// TODO: Same app 10 times fireship
// TODO: FiraCode
// TODO: Stop handling the inner circle for properties and just use outer cell

/**
 * 
 * @param {HTMLCollection} placementCircles 
 */
function setupPlacementCircles(placementCircles) {
    for (let i = 0; i < placementCircles.length; i++) {
        placementCircles[i].index = i;
        placementCircles[i].addEventListener("click", placementCircleClick);
    }
}

/**
 * 
 * @param {Element} caller 
 */
function placementCircleClick(placementCircle) {
    addToken(columns[placementCircle.target.index]);
}

/**
 * 
 * @param {HTMLCollection} columns 
 */
function setupColumns(columns) {
    for (let i = 0; i < columns.length; i++) {
        columns[i].availableSlots = 6;
    };
}

/**
 * 
 * @param {Element} column 
 */
function addToken(column) {
    if (column.availableSlots) {
        let targetCell = column.children[column.availableSlots - 1];
        targetCell.children[0].style.backgroundColor = isPlayer1Turn ? 'red' : 'blue';
        // Store who owns
        targetCell.children[0].player = isPlayer1Turn ? 1 : 2;
        column.availableSlots--;
        if (checkWin(columns, outputText, targetCell)) {
            gameOver();
            return;
        }
        changeTurn(placementCircles, outputText);
    }
}

/**
 * 
 * @param {HTMLCollection} placementCircles 
 * @param {Element} outputText
 */
function changeTurn(placementCircles, outputText) {
    isPlayer1Turn = !isPlayer1Turn;

    let textTurn = isPlayer1Turn ? "Player 1" : "Player 2";
    outputText.textContent = `Your turn ${textTurn}!`;

    let classRemove = isPlayer1Turn ? 'placement-circle-player2' : 'placement-circle-player1';
    let classAdd = isPlayer1Turn ? 'placement-circle-player1' : 'placement-circle-player2';
    for (let circle of placementCircles) {
        circle.classList.add(classAdd);
        circle.classList.remove(classRemove);
    }
}

/**
 * 
 * @param {HTMLCollection} columns 
 * @param {Element} outputText 
 * @param {Element} targetCell 
 * @returns 
 */
function checkWin(columns, outputText, targetCell) {
    let win = isVerticalConnect(targetCell);
    if (win == 1) {
        outputWinner(win, outputText);
        return true;
    }
    if (win == 2) {
        outputWinner(win, outputText);
        return true;
    }

    win = isHorizontalConnect(targetCell);
    if (win == 1) {
        outputWinner(win, outputText);
        console.log("h win 1");
        return true;
    }
    if (win == 2) {
        outputWinner(win, outputText);
        console.log("h win 2");
        return true;
    }

    win = isMainDiagnonalConnect(targetCell);
    if (win == 1) {
        outputWinner(win, outputText);
        return true;
    }
    if (win == 2) {
        outputWinner(win, outputText);
        return true;
    }

    win = isCrossDiagonalConnect(targetCell);
    if (win == 1) {
        outputWinner(win, outputText);
        return true;
    }
    if (win == 2) {
        outputWinner(win, outputText);
        return true;
    }

    return false;

}

//TODO: refactor isVerticalConnect
function isVerticalConnect(targetCell) {
    // who played the token
    let player = targetCell.children[0].player;
    let orginalCell = targetCell;

    let count = 1;

    while (targetCell.top && targetCell.top.children[0].player == player) {

        targetCell = targetCell.top;
        count++;
    }
    targetCell = orginalCell;
    console.log(`bottom: ${targetCell.bottom}`);
    while (targetCell.bottom && targetCell.bottom.children[0].player == player) {

        targetCell = targetCell.bottom;
        count++;
    }

    if (count >= 4) return player;
    return -1;
}

function misMainDiagnonalConnect(columns) {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
            if (row + 3 >= 6 || col + 3 >= 7) continue;
            if (columns[col].children[row].children[0].player == 1
                && columns[col + 1].children[row + 1].children[0].player == 1
                && columns[col + 2].children[row + 2].children[0].player == 1
                && columns[col + 3].children[row + 3].children[0].player == 1) {

                return 1;
            } else if (columns[col].children[row].children[0].player == 2
                && columns[col + 1].children[row + 1].children[0].player == 2
                && columns[col + 2].children[row + 2].children[0].player == 2
                && columns[col + 3].children[row + 3].children[0].player == 2) {

                return 2;
            }
        }
    }
    return -1;
}

function isMainDiagnonalConnect(targetCell) {
    let player = targetCell.children[0].player;
    let originalCell = targetCell;

    let count = 1;
    while (targetCell.topLeft && targetCell.topLeft.children[0].player == player) {
        targetCell = targetCell.topLeft;
        count++;
    }

    targetCell = originalCell;
    while (targetCell.bottomRight && targetCell.bottomRight.children[0].player == player) {
        targetCell = targetCell.bottomRight;
        count++;
    }

    if (count >= 4) return player;
    return -1;
}


function outputWinner(winner, outputText) {
    outputText.textContent = `Player ${winner} wins!`;
}

function isCrossDiagonalConnect(targetCell) {
    let player = targetCell.children[0].player;
    let originalCell = targetCell;

    let count = 1;
    while (targetCell.topRight && targetCell.topRight.children[0].player == player) {
        targetCell = targetCell.topRight;
        count++;
    }

    targetCell = originalCell;
    while (targetCell.bottomLeft && targetCell.bottomLeft.children[0].player == player) {
        targetCell = targetCell.bottomLeft;
        count++;
    }

    if (count >= 4) return player;
    return -1;
}

/**
 * 
 * @param {Element} targetCell 
 */
function isHorizontalConnect(targetCell) {
    // who played the token
    let player = targetCell.children[0].player;
    let orginalCell = targetCell;

    let count = 1;
    while (targetCell.left && targetCell.left.children[0].player == player) {
        targetCell = targetCell.left;
        count++;
    }

    targetCell = orginalCell;
    while (targetCell.right && targetCell.right.children[0].player == player) {
        targetCell = targetCell.right;

        count++;
    }

    if (count >= 4) return player;
    return -1;
}

function reset() {
    outputText.textContent = "Your turn Player 1!";

    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
            let targetCell = columns[col].children[row].children[0];
            targetCell.style.backgroundColor = 'white';
            targetCell.player = 0;
            columns[col].availableSlots = 6;
            isPlayer1Turn = true;
        }
    }
    initialize(placementCircles);
}

/**
 * 
 * @param {HTMLCollection} placementCircle 
 */
function gameOver(placementCircle) {
    // drop placementCircle click event
    for (circle of placementCircles) {
        circle.removeEventListener("click", placementCircleClick);
    }
}

function initialize(placementCircles, columns) {
    setupPlacementCircles(placementCircles);
    storeNeighborCells(columns);
}

/**
 * Adds neighboring cells as properties of cell
 * @param {HTMLCollection} columns 
 */
function storeNeighborCells(columns) {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
            let cell = columns[col].children[row];
            // left
            if (col > 0) {
                cell.left = columns[col - 1].children[row];
                // bottom left
                if (row < 5) cell.bottomLeft = columns[col - 1].children[row + 1];
                // top left
                if (row > 0) cell.topLeft = columns[col - 1].children[row - 1];
            }
            // right
            if (col < 6) {
                cell.right = columns[col + 1].children[row];
                // bottom right
                if (row < 5) cell.bottomRight = columns[col + 1].children[row + 1];
                // top right
                if (row > 0) cell.topRight = columns[col + 1].children[row - 1];
            }
            // top
            if (row > 0) {
                cell.top = columns[col].children[row - 1];
            }
            // bottom
            if (row < 5) {
                cell.bottom = columns[col].children[row + 1];
            }
        }
    }
}


// ***********    MAIN    *************
let placementCircles = document.getElementsByClassName("placement-circle");


let columns = document.getElementsByClassName("column");
setupColumns(columns);

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);

let outputText = document.getElementById("output-text");

let isPlayer1Turn = true;

initialize(placementCircles, columns);
