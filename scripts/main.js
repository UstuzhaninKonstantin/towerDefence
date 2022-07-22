'use strict';
import { allObjects } from "./values.js";
import { Core, Enemy } from "./classes.js"
import { update, draw, keydownEvent, keyupEvent } from "./functions.js";

const core = new Core(0, 0, 50, 50, '#000000', 100);
allObjects['core'].push(core);
let enemy = new Enemy(1000, -1000, '#ff0000', 15, 300, 55, 30, 6);
allObjects['enemies'].push(enemy);

document.addEventListener('keydown', keydownEvent);
document.addEventListener('keyup', keyupEvent);

setInterval(() => {
    update(); 
    draw(); 
}, 1000 / 60);
