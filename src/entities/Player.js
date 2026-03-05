import { Physics } from '../engine/Physics.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.reset();

        this.keys = {};
        window.addEventListener('keydown', e => this.keys[e.code] = true);
        window.addEventListener('keyup', e => this.keys[e.code] = false);
    }

    reset() {
        this.x = 100;
        this.y = 500;
        this.vx = 0;
        this.vy = 0;
        this.speed = 3.5;
        this.isGrounded = false;
        this.jumpHeight = 65; // Desired jump height in pixels
    }

    update(deltaTime) {
        // Horizontal Movement
        if (this.keys['ArrowLeft']) this.vx = -this.speed;
        else if (this.keys['ArrowRight']) this.vx = this.speed;
        else this.vx = 0;

        // Jump
        if (this.keys['ShiftLeft'] && this.isGrounded) {
            this.vy = Physics.getJumpVelocity(this.jumpHeight);
            this.isGrounded = false;
        }

        // Apply Gravity
        this.vy += Physics.GRAVITY;
        if (this.vy > Physics.TERMINAL_VELOCITY) this.vy = Physics.TERMINAL_VELOCITY;

        // Apply Velocity
        this.x += this.vx;
        this.y += this.vy;

        // Screen boundaries
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;
    }

    draw(ctx) {
        // Player Shadow/Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff00';

        ctx.fillStyle = '#00ff00';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.shadowBlur = 0;

        // Eyes (Directional)
        ctx.fillStyle = '#000';
        const eyeOffset = this.vx >= 0 ? 12 : 4;
        ctx.fillRect(this.x + eyeOffset, this.y + 4, 4, 4);
    }
}
