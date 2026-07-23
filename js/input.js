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
function bind(id,key){

const b=document.getElementById(id);

b.ontouchstart=()=>{
touch[key]=true;
};

b.ontouchend=()=>{
touch[key]=false;
};

b.onmousedown=()=>{
touch[key]=true;
};

b.onmouseup=()=>{
touch[key]=false;
};

}

bind("left","left");
bind("right","right");
bind("jump","jump");

document
.getElementById("pause")
.onclick=()=>{

if(game.state===GameState.PLAYING)
game.pauseGame();
else
game.resumeGame();

};

document
.getElementById("fullscreen")
.onclick=()=>{

document.documentElement.requestFullscreen();

};
