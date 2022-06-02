'use strict'

let leftPlayerShipsPositions = {
    byFour: [],
    byThree: [],
    byTwo: [],
    byOne: []
};

let leftPlayerChosenPositions = [];
let rightPlayerChosenPositions = [];

let allPlayerDivs = document.querySelectorAll('.playerMap .table');


allPlayerDivs.forEach(item => {

    item.addEventListener('click', (event) => {
        if (event.target.matches('td') && !event.target.matches('td:first-child') && !event.target.matches('tr:first-child td')) {
            if (event.target.closest('.leftPlayerSide')) {
                if (!event.target.classList.contains('chosen') && leftPlayerChosenPositions.length < 4 && !event.target.classList.contains('unpossible')) {
                    selectNotChosenPosition(leftPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(leftPlayerChosenPositions, event.target);
                    highlightPossibleShipsToBuild(leftPlayerChosenPositions, event.target)
                } else if (event.target.classList.contains('chosen')) {
                    removeAlreadyChosenPosition(leftPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(leftPlayerChosenPositions, event.target);
                    highlightPossibleShipsToBuild(leftPlayerChosenPositions, event.target)
                }
            }
            else if (event.target.closest('.rightPlayerSide')){
                if (!event.target.classList.contains('chosen') && rightPlayerChosenPositions.length < 4 && !event.target.classList.contains('unpossible')) {
                    selectNotChosenPosition(rightPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(rightPlayerChosenPositions, event.target);
                } else if (event.target.classList.contains('chosen')) {
                    removeAlreadyChosenPosition(rightPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(rightPlayerChosenPositions, event.target);
                }
            }
        }
    })
})

// после постройки корабля сделай все не задействованные ячейки possible
// ФУНКЦИЯ ПОДСВЕТКИ ДОСТУПНЫХ ДЛЯ ПОСТРОЙКИ КОРАБЛЕЙ
function highlightPossibleShipsToBuild(playerPositionsArray, target){
    let fourCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .fourCell .overlay');
    let threeCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .threeCell .overlay');
    let twoCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .twoCell .overlay');
    let oneCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .oneCell .overlay');

    let allShips = [...fourCellsShipArray,...threeCellsShipArray,...twoCellsShipArray,...oneCellsShipArray];

    allShips.forEach(item => {item.classList.remove('suggested'); item.style.cssText = 'background-color:black; opacity: 0.2'});

    switch (playerPositionsArray.length) {
        case 1:
            oneCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').classList.add('suggested');
            oneCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').style.opacity = 0.4;
            break;
        case 2:
            twoCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').classList.add('suggested');
            twoCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').style.opacity = 0.4;
            break;
        case 3:
            threeCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').classList.add('suggested');
            threeCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').style.opacity = 0.4;
            break;
        case 4:
            fourCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').classList.add('suggested');
            fourCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.built)').style.opacity = 0.4;
            break;
    }
}

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
        if (!item.matches('td:first-child') && !item.matches('tr:first-child td') && !item.classList.contains('chosen')) {
            item.classList.add('unpossible');
        }
    })
}

function makeAllCellsUnchosen(target) {
    target.closest('tbody').querySelectorAll('td').forEach(item => {
        if (!item.matches('td:first-child') && !item.matches('tr:first-child td')) {
            item.classList.remove('chosen');
            item.classList.remove('unpossible');
        }
    })
}

function makeArrayedIndexesCellsChosen(playerPositionsArray, target) {
    playerPositionsArray.forEach(item => {
        target.closest('tbody').querySelectorAll('tr')[item[0]].querySelectorAll('td')[item[1]].classList.add('chosen');
    });
}

function unlockPossibleCells(playerPositionsArray, target) {
    let direction;
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
            // check if streak was broken by unchoosing chosen cell in the middle of the streak => annihilate all streak and open all the map
                if (direction === 'row') {
                    if(!(playerPositionsArray[0][1] + 1 === playerPositionsArray[1][1] || playerPositionsArray[0][1] === playerPositionsArray[1][1] + 1)){
                        makeAllCellsUnchosen(target);
                        playerPositionsArray.length = 1;
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                }
                else {
                    if(!(playerPositionsArray[0][0] + 1 === playerPositionsArray[1][0] || playerPositionsArray[0][0] === playerPositionsArray[1][0] + 1)){
                        makeAllCellsUnchosen(target);
                        playerPositionsArray.length = 1;
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                }

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

            // check if streak was broken by unchoosing chosen cell in the middle of the streak => annihilate all streak and open all the map
            let rowArray = [playerPositionsArray[0][1], playerPositionsArray[1][1], playerPositionsArray[2][1]];
            let colArray = [playerPositionsArray[0][0], playerPositionsArray[1][0], playerPositionsArray[2][0]];

            if (direction === 'row') {
                console.log(playerPositionsArray)
                if(!(Math.max(...rowArray) - 2 === Math.min(...rowArray))){
                    makeAllCellsUnchosen(target);
                    if (rowArray[0] + 1 === rowArray[1] || rowArray[0] - 1 === rowArray[1]) {
                        playerPositionsArray.splice(2,1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                    else {
                        playerPositionsArray.splice(0,1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                }
            }
            else {
                if(!(Math.max(...colArray) - 2 === Math.min(...colArray))){
                    makeAllCellsUnchosen(target);
                    if (colArray[0] + 1 === colArray[1] || colArray[0] - 1 === colArray[1]) {
                        playerPositionsArray.splice(2,1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                    else {
                        playerPositionsArray.splice(0,1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                }
            }

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