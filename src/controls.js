export default class Controls {
    constructor(player) {
        this.player = player;
        this.setupListeners();
    }

    setupListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.code === "ArrowUp" || event.code === "Space") {
                this.player.jump();
            } else if (event.code === "ArrowDown") {
                this.player.crouch(true);
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.code === "ArrowDown") {
                this.player.crouch(false);
            }
        });
    }
}