'use strict';
import { ctx, canvas, camera, keysPressed } from "./values.js";


/* рисует шарики разных координат, размеров и цветов
в зависимости от указанных параметров */
function drawCircle(color, x, y, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, 0);
    ctx.fill();
}


/*
Класс "сущность". Основной класс, от которого
наследуются все остальные классы объектов. Это означает,
что абсолютно все объекты будут принимать на вход
x, y, width, height и color. Также это означает, что
все объекты будут иметь схожую структуру: constructor,
draw и update(однако могут быть и дополнительные функции)

Пример создания:
new Entity(300, 300, 150, 150, '#000000');
*/
class Entity {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // рисует объект
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - camera.x + canvas.width / 2, this.y - camera.y + canvas.height / 2, this.width, this.height);
    }

    // обновляет объект
    update() {
        /* чото обновляем
        обновляем
        все, обновили!
        */
    }

}


/*
Класс ядра. Ядро - это объект в центре карты(прямоугольник),
который игрок должен защищать, чтобы не проиграть.
Принимает на вход базовые значения(указаны в описании
класса Entity) а также значение HP - количество жизней.

Пример создания:
new Core(300, 200, 150, 150, '#ff00ff', 10);
*/
class Core extends Entity {
    constructor(x, y, width, height, color, hp) {
        super(x, y, width, height, color);
        this.hp = hp;
    }

    draw() {
        super.draw();
    }
}


class Enemy extends Entity {
    constructor(x, y, width, height, color, enemyRadius, attackRadius, damage, attackCooldown) {
        super(x, y, width, height, color);
        this.enemyRadius = enemyRadius;
        this.attackRadius = attackRadius;
        this.damage = damage;
        this.attackCooldown = attackCooldown;
    }

    draw() {
        drawCircle(this.color, this.x - camera.x + canvas.width / 2, this.y - camera.y + canvas.height / 2, this.enemyRadius);
    }

}


export { Core }