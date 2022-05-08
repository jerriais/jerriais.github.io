const canvas = document.querySelector("#board canvas");
const ctx = canvas.getContext("2d");
console.log(ctx.canvas);

ctx.strokeStyle = "black";
ctx.fillStyle = "red";

ctx.fillRect(300,200,50,50);
ctx.strokeRect(300,200,50,50);

ctx.beginPath();
ctx.arc(325,170,25,0,Math.PI *2, false);
ctx.fill();
ctx.stroke();

// const canvas = document.querySelector("#board canvas");
// const ctx = canvas.getContext("2d");
// console.log(ctx.canvas);
