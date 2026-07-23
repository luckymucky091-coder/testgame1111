class Player {

constructor(x,y){

this.x=x;
this.y=y;

this.w=40;
this.h=60;

this.speed=5;
this.jumpPower=15;

this.vx=0;
this.vy=0;

this.gravity=0.8;

this.ground=false;

this.frame=0;

}


update(){

this.vx=0;


// เดินซ้าย

if(
keys["a"] ||
keys["arrowleft"] ||
touch.left
){

this.vx=-this.speed;

}


// เดินขวา

if(
keys["d"] ||
keys["arrowright"] ||
touch.right
){

this.vx=this.speed;

}


this.x+=this.vx;


// แรงโน้มถ่วง

this.vy+=this.gravity;

this.y+=this.vy;



// พื้น

if(this.y+this.h >= canvas.height-80){

this.y=canvas.height-80-this.h;

this.vy=0;

this.ground=true;

}

else{

this.ground=false;

}



// กระโดด

if(
(
keys["w"] ||
keys["arrowup"] ||
keys[" "] ||
touch.jump
)
&& this.ground
){

this.vy=-this.jumpPower;

}


}



draw(){

ctx.save();

ctx.translate(
this.x,
this.y
);


// ผม

ctx.fillStyle="#4b2b20";

ctx.fillRect(
8,
0,
24,
12
);


// หน้า

ctx.fillStyle="#ffd7b5";

ctx.fillRect(
10,
12,
20,
20
);


// ชุดนักเรียน

ctx.fillStyle="#ffffff";

ctx.fillRect(
8,
32,
24,
18
);


// กระโปรง

ctx.fillStyle="#3b65ff";

ctx.fillRect(
5,
50,
30,
10
);


// ขา

ctx.fillStyle="#222";

ctx.fillRect(
10,
60,
7,
10
);

ctx.fillRect(
23,
60,
7,
10
);


// ตา

ctx.fillStyle="black";

ctx.fillRect(
15,
18,
3,
3
);

ctx.fillRect(
24,
18,
3,
3
);


ctx.restore();

}

}
