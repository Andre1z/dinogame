export default class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.jumpPower = -10;
        this.isJumping = false;
        this.isCrouching = false;
    }

    update() {
        if (this.isJumping) {
            this.velocityY = this.jumpPower;
            this.isJumping = false;
        }
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Limitar al suelo
        if (this.y >= 200) {
            this.y = 200;
            this.velocityY = 0;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    jump() {
        if (this.y === 200) {
            this.isJumping = true;
        }
    }

    crouch(isCrouching) {
        this.isCrouching = isCrouching;
        this.height = isCrouching ? 20 : 40;
    }
}