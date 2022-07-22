'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const tileSize = 50;
const keysPressed = {};

const allObjects = {
    "core": [],
    "specialObjects": [],
    "enemies": [],
    "bullets": []
};

const killableObjects = ["core", "enemies", "bullets"];
const playerObjects = ["core"];
const enemyObjects = ["enemies"];


class Camera {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update() {
        if (keysPressed['KeyW'] || keysPressed['ArrowUp']) {
            this.y -= this.speed;
        }
        if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) {
            this.x -= this.speed;
        }
        if (keysPressed['KeyS'] || keysPressed['ArrowDown']) {
            this.y += this.speed;
        }
        if (keysPressed['KeyD'] || keysPressed['ArrowRight']) {
            this.x += this.speed;
        }
    }

    draw() {
        //
    }
}


class Health {
    constructor(object) {
        this.object = object;
    }

    draw() {
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(this.object.x - camera.x + canvas.width / 2, this.object.y - camera.y + canvas.height / 2 - this.object.height / 2, this.object.width, this.object.height / 4);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.object.x - camera.x + canvas.width / 2, this.object.y - camera.y + canvas.height / 2 - this.object.height / 2,this.object.width * (this.object.hp / this.object.maxHP), this.object.height / 4);
    }
}



class Tiles {
    constructor(bgColor, lineColor, tileSize, tilesCount) {
        this.bgColor = bgColor;
        this.lineColor = lineColor;
        this.tileSize = tileSize;
        this.matrix = [];
        for (let i = 0; i < tilesCount; i++) {
            this.matrix.push([]);
            for (let j = 0; j < tilesCount; j++) {
                this.matrix[i].push([]);
            }
        }
    }
    draw() {

    }

    update() {
        //
    }
}



const camera = new Camera(0, 0, 10);
allObjects['specialObjects'].push(camera);

export { canvas, ctx, keysPressed, allObjects, camera, playerObjects, enemyObjects, killableObjects, Health }