'use strict';
import { canvas, allObjects } from "./values.js";
import { Core } from "./classes.js"
import { update, draw, keydownEvent, keyupEvent, createMatrix } from "./functions.js";

const core = new Core(canvas.width / 2 - 50 / 2, canvas.height / 2 - 50 / 2, 50, 50, '#000000', 20);
allObjects['core'].push(core);

document.addEventListener('keydown', keydownEvent);
document.addEventListener('keyup', keyupEvent);

console.log(createMatrix(50,50, 100));

setInterval(() => {
    update(); 
    draw(); 
}, 1000 / 60);
