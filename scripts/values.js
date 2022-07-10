'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const keysPressed = {};
const allObjects = {
    "core": [],
    "camera": []
};


class Camera {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update() {
        if (keysPressed['W'] || keysPressed['ArrowUp']) {
            this.y += this.speed;
        }
        if (keysPressed['A'] || keysPressed['ArrowLeft']) {
            this.x += this.speed;
        }
        if (keysPressed['S'] || keysPressed['ArrowDown']) {
            this.y -= this.speed;
        }
        if (keysPressed['D'] || keysPressed['ArrowRight']) {
            this.x -= this.speed;
        }
    }

    draw() {
        //
    }
}


const camera = new Camera(canvas.width / 2, canvas.height / 2, 10);
allObjects['camera'].push(camera);

export { canvas, ctx, keysPressed, allObjects, camera }