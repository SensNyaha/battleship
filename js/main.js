'use strict'

let leftPlayerShipsPositions = {
    byFour: [],
    byThree: [],
    byTwo: [],
    byOne: []
};

let rightPlayerShipsPositions = {
    byFour: [],
    byThree: [],
    byTwo: [],
    byOne: []
};

let leftPlayerChosenPositions = [];
let rightPlayerChosenPositions = [];

let allShipsInShipShops = document.querySelectorAll('.availableShips .shipShop .overlay');
allShipsInShipShops.forEach(item => {
    item.addEventListener('click', (event) => {
        if (event.target.classList.contains('suggested')) {
            if (event.target.closest('.leftPlayerSide')) {
                buildTheShipOnTheChosenArea(leftPlayerChosenPositions, event.target, leftPlayerShipsPositions);
                markBuiltShip(event.target);
                blockAllCells(event.target, leftPlayerShipsPositions)
            } else {
                buildTheShipOnTheChosenArea(rightPlayerChosenPositions, event.target, rightPlayerShipsPositions);
                markBuiltShip(event.target);
                blockAllCells(event.target, rightPlayerShipsPositions)
            }
        }
    })
})

let allPlayerDivs = document.querySelectorAll('.playerMap .table');


allPlayerDivs.forEach(item => {

    item.addEventListener('click', (event) => {
        if (event.target.matches('td') && !event.target.matches('td:first-child') && !event.target.matches('tr:first-child td')) {
            if (event.target.closest('.leftPlayerSide')) {
                if (!event.target.classList.contains('chosen') && leftPlayerChosenPositions.length < 4 && !event.target.classList.contains('unpossible') && !event.target.classList.contains('built') && !event.target.classList.contains('blocked')) {
                    selectNotChosenPosition(leftPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(leftPlayerChosenPositions, event.target);
                    highlightPossibleShipsToBuild(leftPlayerChosenPositions, event.target, leftPlayerShipsPositions)
                } else if (event.target.classList.contains('chosen')) {
                    removeAlreadyChosenPosition(leftPlayerChosenPositions, event.target, leftPlayerShipsPositions);
                    lightUpPossiblePositions(leftPlayerChosenPositions, event.target);
                    highlightPossibleShipsToBuild(leftPlayerChosenPositions, event.target, leftPlayerShipsPositions)
                }
            } else if (event.target.closest('.rightPlayerSide')) {
                if (!event.target.classList.contains('chosen') && rightPlayerChosenPositions.length < 4 && !event.target.classList.contains('unpossible') && !event.target.classList.contains('built') && !event.target.classList.contains('blocked')) {
                    selectNotChosenPosition(rightPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(rightPlayerChosenPositions, event.target);
                    highlightPossibleShipsToBuild(rightPlayerChosenPositions, event.target, rightPlayerShipsPositions)
                } else if (event.target.classList.contains('chosen')) {
                    removeAlreadyChosenPosition(rightPlayerChosenPositions, event.target);
                    lightUpPossiblePositions(rightPlayerChosenPositions, event.target);
                    highlightPossibleShipsToBuild(rightPlayerChosenPositions, event.target, rightPlayerShipsPositions)
                }
            }
        }
    })
})


function blockAllCells (target, arrayOfBuiltPositions) {
    if (arrayOfBuiltPositions.byOne.length > 3 && arrayOfBuiltPositions.byTwo.length > 2 && arrayOfBuiltPositions.byThree.length > 1 && arrayOfBuiltPositions.byFour.length > 0)
        target.closest('.playerMap').querySelectorAll('td').forEach(item => {
            if (!item.matches('td:first-child') && !item.matches('tr:first-child td') && !item.matches('.built')) {
                item.classList.add('blocked');
            }
        })
}

function buildTheShipOnTheChosenArea(playerPositionsArray, target, arrayOfBuiltPositions) {
    let chosenTDsArray = [];
    playerPositionsArray.forEach(item => {
        chosenTDsArray.push(target.closest('.playerMap').querySelectorAll('tr')[item[0]].querySelectorAll('td')[item[1]])
    });
    chosenTDsArray.forEach(item => {
        item.innerText = chosenTDsArray.length;
        item.classList.add('built');
        item.classList.remove('chosen');
    });
    target.closest('.playerMap').querySelectorAll('td').forEach(item => {
        item.classList.remove('unpossible')
    });
    playerPositionsArray.forEach(item => {
        let blockingPositions = [];
        if (item[0] + 1 < 11) {
            blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0] + 1].querySelectorAll('td')[item[1]], x: item[0] + 1, y: item[1]});
        }
        if (item[1] + 1 < 11){
            blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0]].querySelectorAll('td')[item[1] + 1], x: item[0], y: item[1] + 1});
            
        }
        if (item[1] + 1 < 11 && item[0] + 1 < 11){
            blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0] + 1].querySelectorAll('td')[item[1] + 1], x: item[0] + 1, y: item[1] + 1});
        }
        if (item[0] + 1 < 12) {
            blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0] - 1].querySelectorAll('td')[item[1] + 1], x: item[0] - 1, y: item[1] + 1});
        }
        if (item[0] + 1 < 11) {
            blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0] + 1].querySelectorAll('td')[item[1] - 1], x: item[0] + 1, y: item[1] - 1});
        }
        blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0]].querySelectorAll('td')[item[1] - 1], x: item[0], y: item[1] - 1});
        blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0] - 1].querySelectorAll('td')[item[1] - 1], x: item[0] - 1, y: item[1] - 1});
        blockingPositions.push({cell: target.closest('.playerMap').querySelectorAll('tr')[item[0] - 1].querySelectorAll('td')[item[1]], x: item[0] - 1, y: item[1]});
        
        
        
        
        blockingPositions.forEach(obj => {
            if (obj.x < 11 && obj.y < 11) {

                if (!obj.cell.classList.contains('built') && !obj.cell.classList.contains('blocked')) {
                    obj.cell.classList.add ('blocked');
                }
            }
        })

    })
    switch (chosenTDsArray.length) {
        case 1:
            if (arrayOfBuiltPositions.byOne.length < 4) {
                arrayOfBuiltPositions.byOne.push(chosenTDsArray)
            };
            break;
        case 2:
            if (arrayOfBuiltPositions.byTwo.length < 3) {
                arrayOfBuiltPositions.byTwo.push(chosenTDsArray)
            };
            break;
        case 3:
            if (arrayOfBuiltPositions.byThree.length < 2) {
                arrayOfBuiltPositions.byThree.push(chosenTDsArray)
            };
            break;
        case 4:
            if (arrayOfBuiltPositions.byFour.length < 1) {
                arrayOfBuiltPositions.byFour.push(chosenTDsArray)
            };
            break;
    }
    playerPositionsArray.length = 0;
    highlightPossibleShipsToBuild(playerPositionsArray, target)
}

function markBuiltShip(target) {
    target.classList.remove('suggested');
    target.classList.add('wasBuilt');
}


// после постройки корабля сделай все не задействованные ячейки possible
// ФУНКЦИЯ ПОДСВЕТКИ ДОСТУПНЫХ ДЛЯ ПОСТРОЙКИ КОРАБЛЕЙ
function highlightPossibleShipsToBuild(playerPositionsArray, target, arrayOfBuiltPositions) {
    let fourCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .fourCell .overlay');
    let threeCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .threeCell .overlay');
    let twoCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .twoCell .overlay');
    let oneCellsShipArray = target.closest('.playerMap').querySelectorAll('.availableShips .shipShop .oneCell .overlay');

    let allShips = [...fourCellsShipArray, ...threeCellsShipArray, ...twoCellsShipArray, ...oneCellsShipArray];

    allShips.forEach(item => {
        item.classList.remove('suggested');
        item.classList.add('notSuggested')
    });

    switch (playerPositionsArray.length) {
        case 0:
            allShips.forEach(item => {
                item.classList.remove('suggested');
                item.classList.add('notSuggested')
            });
            break;
        case 1:
            if (arrayOfBuiltPositions.byOne.length < 4) {
                oneCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.add('suggested');
                oneCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.remove('notSuggested');
            }
            break;
        case 2:
            if (arrayOfBuiltPositions.byTwo.length < 3) {
                twoCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.add('suggested');
                twoCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.remove('notSuggested');
            }
            break;
        case 3:
            if (arrayOfBuiltPositions.byThree.length < 2) {
                threeCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.add('suggested');
                threeCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.remove('notSuggested');
            }
            break;
        case 4:
            if (arrayOfBuiltPositions.byFour.length < 1) {
                fourCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.add('suggested');
                fourCellsShipArray[0].parentElement.parentElement.querySelector('.imgWrapper>div:not(.wasBuilt)').classList.remove('notSuggested');
            }
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
        if (!item.matches('td:first-child') && !item.matches('tr:first-child td') && !item.classList.contains('chosen') && !event.target.classList.contains('built')) {
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
                if (!(playerPositionsArray[0][1] + 1 === playerPositionsArray[1][1] || playerPositionsArray[0][1] === playerPositionsArray[1][1] + 1)) {
                    makeAllCellsUnchosen(target);
                    playerPositionsArray.length = 1;
                    makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                    lightUpPossiblePositions(playerPositionsArray, target);
                    return
                }
            } else {
                if (!(playerPositionsArray[0][0] + 1 === playerPositionsArray[1][0] || playerPositionsArray[0][0] === playerPositionsArray[1][0] + 1)) {
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
                if (nextRightCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextRightCellIndex].classList.remove('unpossible');
                }
                if (nextLeftCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextLeftCellIndex].classList.remove('unpossible');
                }
            } else {
                let nextDownCellIndex = Math.max(playerPositionsArray[0][0], playerPositionsArray[1][0]) + 1;
                let nextUpCellIndex = Math.min(playerPositionsArray[0][0], playerPositionsArray[1][0]) - 1;
                if (nextDownCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[nextDownCellIndex].querySelectorAll('td')[playerPositionsArray[0][1]].classList.remove('unpossible')
                }
                if (nextUpCellIndex <= 10) {
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
                if (!(Math.max(...rowArray) - 2 === Math.min(...rowArray))) {
                    makeAllCellsUnchosen(target);
                    if (rowArray[0] + 1 === rowArray[1] || rowArray[0] - 1 === rowArray[1]) {
                        playerPositionsArray.splice(2, 1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    } else {
                        playerPositionsArray.splice(0, 1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                }
            } else {
                if (!(Math.max(...colArray) - 2 === Math.min(...colArray))) {
                    makeAllCellsUnchosen(target);
                    if (colArray[0] + 1 === colArray[1] || colArray[0] - 1 === colArray[1]) {
                        playerPositionsArray.splice(2, 1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    } else {
                        playerPositionsArray.splice(0, 1);
                        makeArrayedIndexesCellsChosen(playerPositionsArray, target);
                        lightUpPossiblePositions(playerPositionsArray, target);
                        return
                    }
                }
            }

            if (direction === 'row') { //same first number in microarray [n][0]
                let nextRightCellIndex = Math.max(playerPositionsArray[0][1], playerPositionsArray[1][1], playerPositionsArray[2][1]) + 1;
                let nextLeftCellIndex = Math.min(playerPositionsArray[0][1], playerPositionsArray[1][1], playerPositionsArray[2][1]) - 1;
                if (nextRightCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextRightCellIndex].classList.remove('unpossible');
                }
                if (nextLeftCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[playerPositionsArray[0][0]].querySelectorAll('td')[nextLeftCellIndex].classList.remove('unpossible');
                }
            } else {
                let nextDownCellIndex = Math.max(playerPositionsArray[0][0], playerPositionsArray[1][0], playerPositionsArray[2][0]) + 1;
                let nextUpCellIndex = Math.min(playerPositionsArray[0][0], playerPositionsArray[1][0], playerPositionsArray[2][0]) - 1;
                if (nextDownCellIndex <= 10) {
                    target.closest('tbody').querySelectorAll('tr')[nextDownCellIndex].querySelectorAll('td')[playerPositionsArray[0][1]].classList.remove('unpossible')
                }
                if (nextUpCellIndex <= 10) {
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