// TODO: Make algorithm check from last click

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
        checkWin(columns);
        changeTurn(placementCircles);
    }
}

/**
 * 
 * @param {HTMLCollection} placementCircles 
 */
function changeTurn(placementCircles) {
    isPlayer1Turn = !isPlayer1Turn;
    let classRemove = isPlayer1Turn ? 'placement-circle-player2' : 'placement-circle-player1';
    let classAdd = isPlayer1Turn ? 'placement-circle-player1' : 'placement-circle-player2';
    for (let circle of placementCircles) {
        circle.classList.add(classAdd);
        circle.classList.remove(classRemove);
    }
}

function checkWin(columns) {
    let win = isVerticalConnect(columns);
    if (win == 1) {
        console.log("Player 1 wins v");
        return;
    }
    if (win == 2) {
        console.log("Player 2 wins v");
        return;
    }

    win = isHorizontalConnect(columns);
    if (win == 1) {
        console.log("Player 1 wins h");
        return;
    }
    if (win == 2) {
        console.log("Player 2 wins h");
        return;
    }

    win = isMainDiagnonalConnect(columns);
    if (win == 1) {
        console.log("Player 1 wins dm");
        return;
    }
    if (win == 2) {
        console.log("Player 2 wins dm");
        return;
    }

    win = isCrossDiagonalConnect(columns);
    if (win == 1) {
        console.log("Player 1 wins dc");
        return;
    }
    if (win == 2) {
        console.log("Player 2 wins dc");
        return;
    }

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

function isHorizontalConnect(columns) {
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


// ***********    MAIN    *************
let placementCircles = document.getElementsByClassName("placement-circle");
setupPlacementCircles(placementCircles);

let columns = document.getElementsByClassName("column");
setupColumns(columns);

let isPlayer1Turn = true;

