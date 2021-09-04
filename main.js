// TODO: Make algorithm check from last click
// TODO: Same app 10 times fireship
// TODO: FiraCode

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
    let win = isVerticalConnect(columns);
    if (win == 1) {
        console.log("here");
        outputWinner(win, outputText);
        return true;
    }
    if (win == 2) {
        outputWinner(win, outputText);
        return true;
    }

    win = isHorizontalConnect(columns, targetCell);
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

    win = isMainDiagnonalConnect(columns);
    if (win == 1) {
        outputWinner(win, outputText);
        return true;
    }
    if (win == 2) {
        outputWinner(win, outputText);
        return true;
    }

    win = isCrossDiagonalConnect(columns);
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
function isVerticalConnect(columns) {
    for (let col = 0; col < 7; col++) {
        let player1Count = 0;
        let player2Count = 0;
        for (let row = 0; row < 6; row++) {
            if (columns[col].children[row].children[0].player == 1) {
                player1Count++;
                player2Count = 0;
            } else if (columns[col].children[row].children[0].player == 2) {
                player2Count++;
                player1Count = 0;
            }
            else {
                player1Count = 0;
                player2Count = 0;
            }
            if (player1Count == 4) return 1;
            if (player2Count == 4) return 2;
        }
    }
    return -1;
}

function isMainDiagnonalConnect(columns) {
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


function outputWinner(winner, outputText) {
    outputText.textContent = `Player ${winner} wins!`;
}

function isCrossDiagonalConnect(columns) {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
            if (row - 3 < 0 || col + 3 >= 7) continue;
            if (columns[col].children[row].children[0].player == 1
                && columns[col + 1].children[row - 1].children[0].player == 1
                && columns[col + 2].children[row - 2].children[0].player == 1
                && columns[col + 3].children[row - 3].children[0].player == 1) {

                return 1;
            } else if (columns[col].children[row].children[0].player == 2
                && columns[col + 1].children[row - 1].children[0].player == 2
                && columns[col + 2].children[row - 2].children[0].player == 2
                && columns[col + 3].children[row - 3].children[0].player == 2) {

                return 2;
            }
        }
    }
    return -1;
}

function isHorizontalConnect(columns, targetCell) {
    for (let row = 0; row < 6; row++) {
        let player1Count = 0;
        let player2Count = 0;
        for (let col = 0; col < 7; col++) {
            if (columns[col].children[row].children[0].player == 1) {
                player1Count++;
                player2Count = 0;
            } else if (columns[col].children[row].children[0].player == 2) {
                player2Count++;
                player1Count = 0;
            }
            else {
                player1Count = 0;
                player2Count = 0;
            }
            if (player1Count == 4) return 1;
            if (player2Count == 4) return 2;
        }
    }
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
