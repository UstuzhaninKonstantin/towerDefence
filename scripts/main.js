'use strict';
import { ctx, canvas, keysPressed, allObjects } from "./values.js";
import { Core } from "./classes.js"


// обрабатывает нажатия клавиш
function keyupEvent(event) {
    keysPressed[event.code] = true;
} 


// обрабатывает отпускания клавиш
function keydownEvent(event) {
    keysPressed[event.code] = false;
}


// обновляет все объекты
function update() {
    for (let arr of Object.values(allObjects)) {
        for (let elem of arr) {
            elem.update();
        }
    }
}


// рисует все объекты и очищает канвас
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let arr of Object.values(allObjects)) {
        for (let elem of arr) {
            elem.draw();
        }
    }
}


// создание матрицы
function createMatrix(sizeMapX, sizeMapY, cellSize) {
    let cells = [];
    for (let X = 0; X < sizeMapX; X++) {
        cells.push([]);
        for (let Y = 0; Y < sizeMapY; Y++) {
            cells[X].push({
                x: (X * cellSize) + 100,
                y: (Y * cellSize) + 100,
            });
        }
    }
    return cells;
}

// let cells = createMatrix(50, 50, 10);
allObjects['core'].push(new Core(canvas.width / 2 - 50 / 2, canvas.height / 2 - 50 / 2, 50, 50, '#000000', 20));

document.addEventListener('keyup', keyupEvent);
document.addEventListener('keydown', keydownEvent);

setInterval(() => {
    update(); 
    draw(); 
}, 1000 / 60);
