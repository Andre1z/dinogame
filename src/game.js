import Player from "./player.js";
import Obstacle from "./obstacles.js";
import Controls from "./controls.js";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const startButton = document.getElementById("startButton");

    // Configuración del canvas
    canvas.width = 800;
    canvas.height = 300;

    let isPlaying = false;

    // Crear jugador y controles
    const player = new Player(50, 200, 40, 40);
    const controls = new Controls(player);

    // Obstáculos iniciales
    const obstacles = [
        new Obstacle(600, 200, 40, 40, 5),
        new Obstacle(900, 200, 40, 40, 5)
    ];

    function checkCollision(player, obstacle) {
        return (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        );
    }

    function gameLoop() {
        if (isPlaying) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Actualizar y dibujar jugador
            player.update();
            player.draw(ctx);

            // Actualizar y dibujar obstáculos
            obstacles.forEach(obstacle => {
                obstacle.update();
                obstacle.draw(ctx);

                // Detección de colisión
                if (checkCollision(player, obstacle)) {
                    isPlaying = false;
                    alert("¡Game Over!");
                }
            });

            requestAnimationFrame(gameLoop);
        }
    }

    startButton.addEventListener("click", () => {
        isPlaying = true;
        gameLoop();
    });
});