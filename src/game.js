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
    let gameSpeed = 5; // Velocidad inicial
    let startTime = null; // Almacena el tiempo en que se inició el juego

    // Crear jugador y controles
    const player = new Player(50, 200, 40, 40);
    const controls = new Controls(player);

    // Obstáculos iniciales
    const obstacles = [
        new Obstacle(600, 200, 40, 40, gameSpeed),
        new Obstacle(900, 200, 40, 40, gameSpeed)
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

            // Calcular tiempo transcurrido desde el inicio
            let currentTime = Date.now();
            let elapsedSeconds = (currentTime - startTime) / 1000;

            // Aumentar velocidad cada 60 segundos
            if (Math.floor(elapsedSeconds) % 60 === 0 && elapsedSeconds > 0) {
                gameSpeed += 0.2;
            }

            // Actualizar y dibujar jugador
            player.update();
            player.draw(ctx);

            // Actualizar y dibujar obstáculos con velocidad ajustada
            obstacles.forEach(obstacle => {
                obstacle.update(gameSpeed);
                obstacle.draw(ctx);

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
        startTime = Date.now(); // Registrar el tiempo de inicio
        gameSpeed = 5; // Resetear velocidad inicial
        gameLoop();
    });
});