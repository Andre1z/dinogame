export default class Obstacle {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    update() {
        this.x -= this.speed; // Mover el obstáculo hacia la izquierda

        // Si el obstáculo sale de la pantalla, resetear su posición
        if (this.x + this.width < 0) {
            this.x = 800; // Volver al inicio (puedes ajustar esto según tu lógica)
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}