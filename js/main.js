
var snake;
var apple;
var map;
var snake = [];


function init() {
  var canvas = document.getElementById("snakeCanvas");
  var ctx = canvas.getContext("2d");
  document.getElementById("mainHTML").addEventListener("keydown",keyPush);

  map = new Map();
  snake = new Snake();
  apple= new Apple(15,15);

  setInterval(game,1000/15)

}



function Snake(){
  var id = "";
  this.x=Math.floor(Math.random()* map.tcx);
  this.y =Math.floor(Math.random()* map.tcy);
  this.xv=0;
  this.yv=0;
  this.tail=5;
  this.trail=[];
  this.score=0;
}

Snake.prototype.eat = function(){
  this.tail++;
}
Snake.prototype.die = function(){
  this.tail=5;
}


function Map(){
  this.gs=20;
  this.tcx = 60;
  this.tcy = 30;
}

function Apple(x,y){
  this.x=x;
  this.y=y;
}

Apple.prototype.eaten = function(){
  this.x=Math.floor(Math.random()*map.tcx);
  this.y =Math.floor(Math.random()*map.tcy);
}


function getScore(){
  return snake.score;
}


function game(){
  var canvas = document.getElementById("snakeCanvas");
  var ctx = canvas.getContext("2d");

  ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.font = "15px Courier New";
  ctx.strokeStyle= 'black';
  ctx.strokeText("Score:", 10, 10, 100);
  ctx.strokeText(snake.score,70,10,130);
  snake.x+=snake.xv;
  snake.y+=snake.yv;
  if(snake.x<0){
    snake.x = map.tcx-1;
  }
  if(snake.x>map.tcx-1){
    snake.x=0;
  }
  if(snake.y<0){
    snake.y = map.tcy-1;
  }
  if(snake.y>map.tcy-1){
    snake.y=0;
  }

  ctx.fillStyle="lime";
  for(var i =0; i<snake.trail.length; i++){
    ctx.fillRect(snake.trail[i].x*map.gs,snake.trail[i].y*map.gs,map.gs-2,map.gs-2);
    if(snake.trail[i].x==snake.x&&snake.trail[i].y==snake.y){
      snake.tail = 5;
      snake.score=0;
    }
  }

  snake.trail.push({x:snake.x,y:snake.y});
  while(snake.trail.length>snake.tail){
    snake.trail.shift();
  }
  if(apple.x==snake.x&&apple.y==snake.y){
    snake.tail++;
    snake.score+=10;
    apple.x=Math.floor(Math.random()*map.tcx);
    apple.y =Math.floor(Math.random()*map.tcy);

  }
  ctx.fillStyle="red";
  ctx.fillRect(apple.x*map.gs,apple.y*map.gs,map.gs-2,map.gs-2);

  return snake.score;
}

function keyPush(evt){
  evt.preventDefault();
  switch(evt.keyCode){
    case 37:
      if(snake.xv!=1){
      snake.xv = -1;
      snake.yv=0;
      }
      break;
    case 38:
      if(snake.yv!=1){
      snake.xv=0;
      snake.yv = -1;}
      break;
    case 39:
      if(snake.xv!=-1){
      snake.xv=1;
      snake.yv=0;}
      break;
    case 40:
      if(snake.yv!=-1) {
        snake.xv = 0;
        snake.yv = 1;}
        break;
  }
}
