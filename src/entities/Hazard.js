import { Physics } from '../engine/Physics.js';

export class Hazard {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = 'hazard';
    }

    update() {
        if (Physics.checkCollision(this.game.player, this)) {
            this.game.restart();
        }
    }

    draw(ctx) {
        // To be implemented by subclasses
    }
}

export class Spike extends Hazard {
    constructor(game, x, y, direction = 'up') {
        super(game, x, y, 32, 32);
        this.direction = direction;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ff0000';

        ctx.beginPath();
        if (this.direction === 'up') {
            ctx.moveTo(this.x, this.y + this.height);
            ctx.lineTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
        } else if (this.direction === 'down') {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height);
            ctx.lineTo(this.x + this.width, this.y);
        }
        // Add more directions if needed
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
    }
}

export class FallingApple extends Hazard {
    constructor(game, x, y) {
        super(game, x, y, 20, 20);
        this.vy = 0;
        this.triggered = false;
        this.triggerX = x - 50; // Simple horizontal trigger
    }

    update() {
        if (!this.triggered && this.game.player.x > this.triggerX) {
            this.triggered = true;
            this.vy = -5; // Falls "up" as per GDD "maçãs que caem para cima"
        }

        if (this.triggered) {
            this.y += this.vy;
        }

        super.update();
    }

    draw(ctx) {
        ctx.fillStyle = '#ff3333';
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 10, 0, Math.PI * 2);
        ctx.fill();
        // Stem
        ctx.fillStyle = '#663300';
        ctx.fillRect(this.x + 8, this.y - 5, 4, 8);
    }
}
