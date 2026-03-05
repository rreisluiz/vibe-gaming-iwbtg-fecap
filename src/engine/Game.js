import { Player } from '../entities/Player.js';
import { Level0 } from '../levels/Level0.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 800;
        this.height = 600;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.lastTime = 0;
        this.isRunning = false;

        this.state = {
            frame: 0,
            deaths: 0
        };

        this.player = new Player(this);
        this.level = new Level0(this);
    }

    start() {
        this.isRunning = true;
        requestAnimationFrame(this.loop.bind(this));
    }

    restart() {
        console.log("RESET DE OURO: Voltando ao Frame 0");
        this.state.frame = 0;
        this.state.deaths++;
        document.getElementById('death-counter').innerText = `Mortes: ${this.state.deaths}`;
        this.player.reset();
        this.level.init(); // Reset hazards (apples back to position)
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        this.state.frame++;
        requestAnimationFrame(this.loop.bind(this));
    }

    update(deltaTime) {
        this.player.update(deltaTime);
        this.level.update();
    }

    draw() {
        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Grid background for development
        this.ctx.strokeStyle = '#111';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }

        this.level.draw(this.ctx);
    }
}
