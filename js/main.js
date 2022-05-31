'use strict'

let leftPlayerShipsPositions = {byFour: [], byThree: [], byTwo: [], byOne: []};

let leftPlayerChosenPositions = [];

let allPlayerDivs = document.querySelectorAll('.playerMap .table');

allPlayerDivs.forEach(item => {

    item.querySelectorAll('td').forEach(item => {
        if (!item.matches('td:first-child') && !item.matches('tr:first-child td')){
            item.classList.add('possible')
        }
    })

    item.addEventListener('click', (event)=>{
        if (event.target.matches('td') && !event.target.matches('td:first-child') && !event.target.matches('tr:first-child td')){
            if (event.target.closest('.leftPlayerSide')){
                if (!event.target.classList.contains('chosen') && leftPlayerChosenPositions.length < 4 && event.target.classList.contains('possible')) {
                    selectNotChosenPosition(leftPlayerChosenPositions, event.target)
                    console.log('select')
                }
                else if (event.target.classList.contains('chosen')) {
                    removeAlreadyChosenPosition(leftPlayerChosenPositions, event.target);
                    returnArrayOfPossiblePositions(leftPlayerChosenPositions, event.target);
                    console.log('remove')
                }
            }
        }
    })
})


// после постройки корабля сделай все не задействованные ячейки possible

function lightUpPossiblePositions(playerPositionsArray, target){
    switch (playerPositionsArray.length) {
        case 0:
            target.closest('tbody').querySelectorAll('td').forEach(item => {
                if (!item.matches('td:first-child') && !item.matches('tr:first-child td')){
                    item.classList.remove('unpossible');
                    item.classList.add('possible');
                }
            });
            break;
        case 1:
            //ПРОДОЛЖИ ЛОГИКУ ДЕЙСТВИЙ ПО ОРГАНИЗАЦИИ ПОДСВЕТКИ ВОЗМОЖНЫХ ПОЗИЦИЙ
            // case 1 будет реализовывать подсветку элементов по 4 сторонам света, когда лишь один элемент в массиве выбранных chosen ячеек
            // case 2 будет определять какой из элементов (0) или (1) повторяется для определения вертикаль/горизонталь и чтобы далее строить планируемое направление
            // case 3 работает аналогично, только он ищет минимальное и максимальное значения и от них (-1) и (+1) соответственно
            // case 4 добавит всем остальным ячейкам класс unpossible
    }
    
}

function selectNotChosenPosition(playerPositionsArray, target){
    target.style.backgroundColor = 'pink';
    target.classList.add('chosen');
    playerPositionsArray.push(returnMyPosition(target));
}

function removeAlreadyChosenPosition(playerPositionsArray, target) {
    target.style.backgroundColor = 'transparent';
    target.classList.remove('chosen');
    playerPositionsArray.splice(leftPlayerChosenPositions.indexOf(returnMyPosition(target)),1);
}

function returnMyPosition (target) {
    return [Array.from(target.closest('tr').querySelectorAll('td')).indexOf(target),Array.from(target.closest('tbody').querySelectorAll('tr')).indexOf(target.closest('tr'))]
}