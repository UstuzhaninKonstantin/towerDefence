import { allObjects, canvas, ctx, keysPressed } from "./values.js";


/* рисует шарики разных координат, размеров и цветов
в зависимости от указанных параметров */
function drawCircle(color, x, y, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, 0);
    ctx.fill();
}


// обрабатывает нажатия клавиш
function keydownEvent(event) {
    keysPressed[event.code] = true;
}


// обрабатывает отпускания клавиш
function keyupEvent(event) {
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


export { createMatrix, draw, update, keydownEvent, keyupEvent, drawCircle }