import { Spike, FallingApple } from '../entities/Hazard.js';

export class Level0 {
    constructor(game) {
        this.game = game;
        this.hazards = [];
        this.platforms = [
            { x: 0, y: 580, width: 800, height: 20 }, // Floor
            { x: 300, y: 450, width: 200, height: 20 }, // Mid platform
            { x: 100, y: 350, width: 100, height: 20 },
            { x: 600, y: 350, width: 100, height: 20 },
        ];

        this.init();
    }

    init() {
        // Some spikes on the floor
        this.hazards.push(new Spike(this.game, 400, 548, 'up'));
        this.hazards.push(new Spike(this.game, 432, 548, 'up'));

        // Falling apple trap
        this.hazards.push(new FallingApple(this.game, 350, 500));

        // Hidden spike on platform
        this.hazards.push(new Spike(this.game, 320, 418, 'up'));
    }

    update() {
        this.hazards.forEach(h => h.update());

        // Basic platform collision for player
        this.game.player.isGrounded = false;
        this.platforms.forEach(p => {
            if (this.game.player.vx >= 0 &&
                this.game.player.x + this.game.player.width > p.x &&
                this.game.player.x < p.x + p.width &&
                this.game.player.y + this.game.player.height > p.y &&
                this.game.player.y + this.game.player.height < p.y + p.height + 10 &&
                this.game.player.vy >= 0) {

                this.game.player.y = p.y - this.game.player.height;
                this.game.player.vy = 0;
                this.game.player.isGrounded = true;
            }
        });
    }

    draw(ctx) {
        // Draw platforms
        ctx.fillStyle = '#222';
        this.platforms.forEach(p => {
            ctx.fillRect(p.x, p.y, p.width, p.height);
            // Highlight edge
            ctx.fillStyle = '#444';
            ctx.fillRect(p.x, p.y, p.width, 2);
            ctx.fillStyle = '#222';
        });

        // Draw hazards
        this.hazards.forEach(h => h.draw(ctx));
    }
}
