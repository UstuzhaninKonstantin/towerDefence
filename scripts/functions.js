import { allObjects, canvas, ctx, keysPressed, killableObjects } from "./values.js";


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
    Object.values(allObjects).filter(elem => !elem.toDelete);
    for (let arr of Object.values(allObjects)) {
        for (let elem of arr) {
            elem.update();
        }
    }

    for (let object of killableObjects) {
        allObjects[object] = allObjects[object].filter(obj => !obj.toDelete);
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


function rectRectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y;

}


function circleCircleCollision(circle1, circle2) {
    let distance = Math.sqrt((circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2)
    return distance < (circle1.radius + circle2.radius) && distance < (circle1.radius + circle2.radius)
}


function rectCircleCollision(rect, circle) {
    let dx = Math.abs(circle.x - (rect.x + rect.width / 2));
    let dy = Math.abs(circle.y - (rect.y + rect.height / 2));

    if (dx > circle.radius + rect.width / 2 ) {
        return false;
    }
    if (dy > circle.radius + rect.height / 2 ) {
        return false;
    }
    if (dx <= rect.width ) {
        return true;
    }
    if (dy <= rect.height ) {
        return true;
    }

    dx -= rect.width;
    dy -= rect.height;
    return (dx * dx + dy * dy <= circle.radius * circle.radius);
}


export { draw, update, keydownEvent, keyupEvent, drawCircle, rectCircleCollision, rectRectCollision, circleCircleCollision }