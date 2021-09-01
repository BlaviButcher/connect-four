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
        column.availableSlots--;
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


// ***********    MAIN    *************
let placementCircles = document.getElementsByClassName("placement-circle");
setupPlacementCircles(placementCircles);

let columns = document.getElementsByClassName("column");
setupColumns(columns);

let isPlayer1Turn = true;

