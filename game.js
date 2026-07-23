const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

canvas.width = 1280;

canvas.height = 720;

ctx.imageSmoothingEnabled = false;

function resize(){

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

}

window.addEventListener(

"resize",

resize

);

resize();

function drawBackground(){

ctx.fillStyle="#87CEEB";

ctx.fillRect(

0,

0,

canvas.width,

canvas.height

);

// ดวงอาทิตย์

ctx.fillStyle="#FFD84D";

ctx.beginPath();

ctx.arc(

100,

100,

50,

0,

Math.PI*2

);

ctx.fill();

// เมฆ

ctx.fillStyle="white";

ctx.beginPath();

ctx.arc(260,120,30,0,Math.PI*2);

ctx.arc(300,110,35,0,Math.PI*2);

ctx.arc(340,120,30,0,Math.PI*2);

ctx.fill();

}

function gameLoop(){

drawBackground();

requestAnimationFrame(

gameLoop

);

}

gameLoop();
