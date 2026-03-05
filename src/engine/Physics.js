export class Physics {
    static GRAVITY = 0.4;
    static TERMINAL_VELOCITY = 10;

    static getJumpVelocity(height) {
        // v0 = sqrt(2 * g * h)
        return -Math.sqrt(2 * this.GRAVITY * height);
    }

    static checkCollision(rect1, rect2) {
        // Unfair Hitbox: Add a small buffer to the first rect (usually the player or hazard)
        const buffer = 2;
        return rect1.x < rect2.x + rect2.width + buffer &&
            rect1.x + rect1.width + buffer > rect2.x &&
            rect1.y < rect2.y + rect2.height + buffer &&
            rect1.y + rect1.height + buffer > rect2.y;
    }
}
