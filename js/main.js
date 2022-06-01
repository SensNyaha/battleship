'use strict'

let leftPlayerShipsPositions = {
    byFour: [],
    byThree: [],
    byTwo: [],
    byOne: []
};

let leftPlayerChosenPositions = [];

let allPlayerDivs = document.querySelectorAll('.playerMap .table');

let direction;

allPlayerDivs.forEach(item => {

    item.addEventListener('click', (event) => {
        if (event.target.matches('td') && !event.target.matches('td:first-child') && !event.target.matches('tr:first-child td')) {
            if (event.target.closest('.leftPlayerSide')) {
                if (!event.target.classList.contains('chosen') && leftPlayerChosenPositions.length < 4 && !event.target.classList.contains('unpossible')) {
                    selectNotChosenPosition(leftPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(leftPlayerChosenPositions, event.target);
                    console.log('select', leftPlayerChosenPositions)
                } else if (event.target.classList.contains('chosen')) {
                    removeAlreadyChosenPosition(leftPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(leftPlayerChosenPositions, event.target);
                    console.log('remove', leftPlayerChosenPositions)
                }
            }
        }
    })
})


// после постройки корабля сделай все не задействованные ячейки possible

function lightUpPossiblePositions(playerPositionsArray, target) {
    switch (playerPositionsArray.length) {
        case 0:
            target.closest('tbody').querySelectorAll('td').forEach(item => {
                if (!item.matches('td:first-child') && !item.matches('tr:first-child td')) {
                    item.classList.remove('unpossible');
                }
            });
            break;
        case 1:
            makeAllCellsUnpossible(target);
            unlockPossibleCells(playerPositionsArray, target);
            break;
        case 2:
            makeAllCellsUnpossible(target);
            unlockPossibleCells(playerPositionsArray, target);
            break;
        case 3:
            makeAllCellsUnpossible(target);
            unlockPossibleCells(playerPositionsArray, target);
            break;
        case 4:
            makeAllCellsUnpossible(target);
            break;
    }

}

function makeAllCellsUnpossible(target) {
    target.closest('tbody').querySelectorAll('td').forEach(item => {
        if (!item.matches('td:first-child') && !item.matches('tr:first-child td') && item !== target && !item.classList.contains('chosen')) {
            item.classList.add('unpossible');
        }
    })
}

function unlockPossibleCells(playerPositionsArray, target) {
    switch (playerPositionsArray.length) {
        case 1:
            let possibleCellsIndexes = [];

            possibleCellsIndexes.push([playerPositionsArray[0][0] + 1, playerPositionsArray[0][1]]);
            possibleCellsIndexes.push([playerPositionsArray[0][0], playerPositionsArray[0][1] + 1]);
            possibleCellsIndexes.push([playerPositionsArray[0][0] - 1, playerPositionsArray[0][1]]);
            possibleCellsIndexes.push([playerPositionsArray[0][0], playerPositionsArray[0][1] - 1]);

            let filteredPossibleCellsIndexes = possibleCellsIndexes.filter(item => {
                return item[0] <= 10 && item[1] <= 10
            });

            let possibleCells = [];

            filteredPossibleCellsIndexes.forEach(item => {
                possibleCells.push(target.closest('tbody').querySelectorAll('tr')[item[0]].querySelectorAll('td')[item[1]])
            });

            possibleCells.forEach(item => {
                item.classList.remove('unpossible');
            });

            break;
        case 2:
            direction = playerPositionsArray[0][0] === playerPositionsArray[1][0] ? 'row' : 'col';

            if (direction === 'row') { //same first number in microarray [n][0]
                let nextRightCellIndex = Math.max(playerPositionsArray[0][1], playerPositionsArray[1][1]) + 1;
                let nextLeftCellIndex = Math.min(playerPositionsArray[0][1], playerPositionsArray[1][1]) - 1;
                if (nextRightCellIndex <= 10){
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextRightCellIndex].classList.remove('unpossible');
                }
                if (nextLeftCellIndex <= 10){
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextLeftCellIndex].classList.remove('unpossible');
                }
            }
            else{
                let nextDownCellIndex = Math.max(playerPositionsArray[0][0], playerPositionsArray[1][0]) + 1;
                let nextUpCellIndex = Math.min(playerPositionsArray[0][0], playerPositionsArray[1][0]) - 1;
                if (nextDownCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[nextDownCellIndex].querySelectorAll('td')[playerPositionsArray[0][1]].classList.remove('unpossible')}
                if (nextUpCellIndex<= 10) {
                    target.closest('tbody').querySelectorAll('tr')[nextUpCellIndex].querySelectorAll('td')[playerPositionsArray[0][1]].classList.remove('unpossible')
                }
            }
            break;
        case 3:
            direction = playerPositionsArray[0][0] === playerPositionsArray[1][0] && playerPositionsArray[1][0] === playerPositionsArray[2][0] ? 'row' : 'col';
            if (direction === 'row') { //same first number in microarray [n][0]
                let nextRightCellIndex = Math.max(playerPositionsArray[0][1], playerPositionsArray[1][1], playerPositionsArray[2][1]) + 1;
                let nextLeftCellIndex = Math.min(playerPositionsArray[0][1], playerPositionsArray[1][1], playerPositionsArray[2][1]) - 1;
                if (nextRightCellIndex <= 10){
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextRightCellIndex].classList.remove('unpossible');
                }
                if (nextLeftCellIndex <= 10){
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextLeftCellIndex].classList.remove('unpossible');
                }
            }
            else{
                let nextDownCellIndex = Math.max(playerPositionsArray[0][0], playerPositionsArray[1][0], playerPositionsArray[2][0]) + 1;
                let nextUpCellIndex = Math.min(playerPositionsArray[0][0], playerPositionsArray[1][0], playerPositionsArray[2][0]) - 1;
                if (nextDownCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[nextDownCellIndex].querySelectorAll('td')[playerPositionsArray[0][1]].classList.remove('unpossible')}
                if (nextUpCellIndex<= 10) {
                    target.closest('tbody').querySelectorAll('tr')[nextUpCellIndex].querySelectorAll('td')[playerPositionsArray[0][1]].classList.remove('unpossible')
                }
            }
            break;
    }
}

function selectNotChosenPosition(playerPositionsArray, target) {
    target.classList.add('chosen');
    playerPositionsArray.push(returnMyPosition(target));
}

function removeAlreadyChosenPosition(playerPositionsArray, target) {
    target.classList.remove('chosen');
    let currentPosition = playerPositionsArray.filter(item => {
        let currentTargetPosition = returnMyPosition(target);
        if (item[0] === currentTargetPosition[0]) {
            if (item[1] === currentTargetPosition[1]) {
                return true
            }
        }
    })[0]
    playerPositionsArray.splice(playerPositionsArray.indexOf(currentPosition), 1);
}

function returnMyPosition(target) {
    return [Array.from(target.closest('tbody').querySelectorAll('tr')).indexOf(target.closest('tr')), Array.from(target.closest('tr').querySelectorAll('td')).indexOf(target)]
}