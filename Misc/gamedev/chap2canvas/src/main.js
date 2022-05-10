const canvas = document.querySelector("#board canvas");
const ctx = canvas.getContext("2d");
const { width:w, height:h} = canvas;

// ctx.strokeStyle = "red";
// ctx.fillStyle = "black";
// ctx.fillRect(0,0,w,h);
// ctx.fillStyle = "#555"

// let x, y, radius;

// for (let i=0; i < 500; i++) {
//     x = Math.random() * w;
//     y = Math.random() * h;
//     radius = Math.random() * 3;
//     // console.log (x,y,radius);
//     ctx.beginPath();
//     ctx.arc(x,y,radius,0,Math.PI*2,false);
//     ctx.fill();
// }
// ctx.font='20px courier';

// const center = w/2;
// ctx.textAlign="center";
// for (let i = 0; i < 11; i++) {
//     ctx.fillText("if you're in the game", center, i * 40);
// }
// ctx.strokeText("stroke's the word", center, h - 30);

ctx.save();
ctx.save();
ctx.globalAlpha = 0.3;
ctx.fillStyle = "blue";
draw();
ctx.fillStyle = "orange";
draw();
ctx.fillStyle = "green";
draw();
ctx.restore();
ctx.fillStyle = "lemonchiffon";
draw();

// for (let ring = 1; ring < 18; ring++) {
//     ctx.fillStyle = `hsl(${ring * 18}, 90%, 50%)`;
//     for (let dots = 0; dots < ring * 4; dots++) {
//       ctx.rotate((Math.PI * 2) / (ring * 4));
//       ctx.beginPath();
//       ctx.arc(0, ring * 15, 7, 0, Math.PI * 2, true);
//       ctx.fill();
//     }
//   }

// ctx.fillRect(300,200,50,50);
// ctx.strokeRect(300,200,50,50);
// ctx.beginPath();
// ctx.arc(325,170,25,0,Math.PI *2, false);
// ctx.fill();
// ctx.stroke();

// const canvas = document.querySelector("#board canvas");
// const ctx = canvas.getContext("2d");
// console.log(ctx.canvas);
