'use strict';
import { ctx, canvas, camera, allObjects, playerObjects, Health } from "./values.js";
import { drawCircle, rectRectCollision } from "./functions.js";


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
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.toDelete = false;
    }

    // рисует объект
    draw() {
        // рисуем
        // нарисовали
    }

    // обновляет объект
    update() {
        /* что-то обновляем
        ещё обновляем
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
        super(x, y, color);
        this.width = width;
        this.height = height;
        this.maxHP = hp;
        this.hp = hp;
        this.type = 'rect';
        this.health = new Health(this);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - camera.x + canvas.width / 2, this.y - camera.y + canvas.height / 2, this.width, this.height);
        this.health.draw();
    }

    update() {
        if (this.hp <= 0) {
            this.toDelete = true;
        }
    }
}


class Enemy extends Entity {
    constructor(x, y, color, radius, attackRadius,
                damage, attackCooldown, speed, hp) {
        super(x, y, color);
        this.radius = radius;
        this.attackRadius = attackRadius;
        this.damage = damage;
        this.attackCooldown = attackCooldown;
        this.speed = speed;
        this.timer = this.attackCooldown;
        this.hp = hp;
        this.width = 0;
        this.height = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        drawCircle(this.color, this.x - camera.x + canvas.width / 2, this.y - camera.y + canvas.height / 2, this.radius);
    }

    update() {
        this.moveToCore();
        if (this.hp === 0) {
            this.toDelete = true;
        }
    }

    moveToCore() {
        let core = allObjects['core'][0];
        if (!core) {
            return;
        }
        let x = core.x + core.width / 2;
        let y = core.y + core.height / 2;

        let distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        let angle = Math.atan2(x - this.y, y - this.x);
        let dx = Math.cos(angle);
        let dy = Math.sin(angle);
        if (distance >= this.attackRadius) {
            this.x += dx * this.speed;
            this.y += dy * this.speed;
        } else {
            this.attack(dx, dy);
        }
    }

    attack(dx, dy) {
        if (this.timer === this.attackCooldown) {
            allObjects['bullets'].push(new Bullet(this.x, this.y, '#ffe600', 20, 20, this.damage, true, 10, dx, dy));
            this.timer = 0;
        }
        this.timer += 1;
    }

}


class Bullet extends Entity {
    constructor(x, y, color, width, height, damage, visibility, speed, dx, dy) {
        super(x, y, color);
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.visibility = visibility;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.toDelete = false;

    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        for (let name of playerObjects) {
            for (let object of allObjects[name]) {
                if (rectRectCollision(this, object)) {
                    object.hp -= this.damage;
                    this.toDelete = true;
                    break;
                }
            }
        }
    }

    draw() {
        if (this.visibility) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - camera.x + canvas.width / 2, this.y - camera.y + canvas.height / 2, this.width, this.height);
        }
    }

}


export { Core, Enemy }