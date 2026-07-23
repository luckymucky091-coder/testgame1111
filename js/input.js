const keys = {};

addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;

    if (e.key === "Escape") {
        if (game.state === GameState.PLAYING)
            game.pauseGame();
        else if (game.state === GameState.PAUSE)
            game.resumeGame();
    }
});

addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

const touch = {
    left:false,
    right:false,
    jump:false
};
