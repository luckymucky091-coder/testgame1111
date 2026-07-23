/* ==========================================
   Quiz Land P6
   Game Engine v1.0
========================================== */

const GameState = {
    MENU: "menu",
    PLAYING: "playing",
    PAUSE: "pause",
    QUIZ: "quiz",
    RESULT: "result"
};

class Game {

    constructor() {

        this.state = GameState.MENU;

        this.lastTime = 0;

        this.deltaTime = 0;

        this.fps = 0;

        this.camera = {
            x: 0,
            y: 0,
            width: 1280,
            height: 720
        };

        this.assets = {};

        this.imagesLoaded = 0;
        this.totalImages = 0;

        this.paused = false;

    }

    /* =====================
        GAME LOOP
    ====================== */

    start() {

        requestAnimationFrame(
            this.loop.bind(this)
        );

    }

    loop(time) {

        this.deltaTime =
            (time - this.lastTime) / 1000;

        this.lastTime = time;

        if (this.deltaTime > 0) {

            this.fps =
                Math.round(
                    1 / this.deltaTime
                );

        }

        this.update();

        this.render();

        requestAnimationFrame(
            this.loop.bind(this)
        );

    }

    /* =====================
        UPDATE
    ====================== */

    update() {

        switch (this.state) {

            case GameState.MENU:
                break;

            case GameState.PLAYING:
                this.updatePlaying();
                break;

            case GameState.PAUSE:
                break;

            case GameState.QUIZ:
                break;

            case GameState.RESULT:
                break;

        }

    }

    updatePlaying() {

        // จะเพิ่มระบบ Player
        // Physics
        // Coin
        // Enemy
        // School
        // ในตอนต่อไป

    }

    /* =====================
        RENDER
    ====================== */

    render() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        drawBackground();

        this.drawFPS();

    }

    drawFPS() {

        ctx.fillStyle = "white";

        ctx.font = "20px Arial";

        ctx.fillText(
            "FPS : " + this.fps,
            20,
            30
        );

    }

    /* =====================
        GAME STATE
    ====================== */

    startGame() {

        this.state = GameState.PLAYING;

        document.getElementById("menu")
            .style.display = "none";

        document.getElementById("hud")
            .style.display = "flex";

    }

    pauseGame() {

        this.state = GameState.PAUSE;

    }

    resumeGame() {

        this.state = GameState.PLAYING;

    }

    showQuiz() {

        this.state = GameState.QUIZ;

    }

    finishGame() {

        this.state = GameState.RESULT;

    }

    /* =====================
        CAMERA
    ====================== */

    follow(target) {

        this.camera.x =
            target.x -
            canvas.width / 2;

        this.camera.y =
            target.y -
            canvas.height / 2;

        if (this.camera.x < 0)
            this.camera.x = 0;

        if (this.camera.y < 0)
            this.camera.y = 0;

    }

    /* =====================
        ASSET LOADER
    ====================== */

    loadImage(name, src) {

        this.totalImages++;

        const img = new Image();

        img.src = src;

        img.onload = () => {

            this.imagesLoaded++;

        }

        this.assets[name] = img;

    }

    getImage(name) {

        return this.assets[name];

    }

}

const game = new Game();

window.onload = () => {

    document
        .getElementById("startBtn")
        .addEventListener("click", () => {

            game.startGame();

        });

    game.start();

};
let player;
