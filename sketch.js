//Global Variables
var monkey,monkey_img,ground_img,ground,obstacle,obstacle_img,banana,banana_img,reset,reset_img;
var count,colliding_line,gameOver_img,gameOver;
var PLAY;
var END;
var gameState;
var banana_Group,obstacle_Group;


function preload(){

ground_img = loadImage("jungle.jpg")
obstacle_img = loadImage("stone.png")

banana_img = loadImage("Banana.png")

reset_img = loadImage("restart.png")

gameOver_img = loadImage("gameOver.png")
  monkey_img = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png",
    "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
}


function setup() {
  createCanvas(600,500);

  

ground = createSprite(200,200,400,400)
ground.addImage("ground",ground_img)
ground.velocityX = -6
ground.scale= 1.4

monkey = createSprite(100,400,100,100)
monkey.addAnimation("monkey",monkey_img)
monkey.scale = 0.2

reset = createSprite(250,400,50,50)
reset.addImage("reset",reset_img)
reset.visible = false;

colliding_line = createSprite(300,450,600,10)
colliding_line.visible = false;

gameOver = createSprite(250,250,50,50)
gameOver.addImage("gameover",gameOver_img)
gameOver.visible = false;

banana_Group = createGroup();
obstacle_Group = createGroup();


count = 0

PLAY = 1
END = 0
gameState = PLAY


}





function draw(){
 background(255);


 if(gameState === PLAY){

 if(ground.x < 0){
  ground.x = ground.width/2
}




  //jump when the space key is pressed
  if(keyDown("space")&& monkey.y > 350){
    monkey.velocityY = -9 ;
  }
  monkey.velocityY = monkey.velocityY +0.28
      
  

  
 
  if(monkey.isTouching(banana_Group)){
banana_Group.destroyEach();
count = count+3
  }

spawnObstacles();
 spawnBanana();
  



if(monkey.isTouching(obstacle_Group)){
  gameState = END
}

 }

 


if(gameState === END){

monkey.visible = false;
obstacle_Group.destroyEach();
ground.visible = false;
banana_Group.destroyEach();

gameOver.visible = true;
reset.visible = true;


if(mousePressedOver(reset)|| keyDown("enter")){
  gameState = PLAY
 reset.visible = false;
 gameOver.visible = false;
 ground.visible = true;
 monkey.visible = true;
  count =count-count
 
  
}
}



drawSprites();

monkey.collide(colliding_line)
text("SCORE:"+count,500,50)
}




function spawnObstacles() {
  if(frameCount % 200 === 0) {
     obstacle = createSprite(650,420.5,10,40);
    
    obstacle.velocityX = -6
   
    obstacle.addImage("stone",obstacle_img)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.13;
    obstacle.lifetime = 250;
  
  obstacle.collide(monkey)
  
  //obstacle.setCollider("circle")
  obstacle_Group.add(obstacle)
  
    
  }

  
  
}

function spawnBanana() {
if(frameCount % 80 === 0) {
  var banana = createSprite(650,250,10,40);
  
  banana.velocityX = -5
 
  banana.addImage("banana",banana_img)

  
  //assign scale and lifetime to the obstacle           
  banana.scale = 0.08;
  banana.lifetime = 200;

  //banana.setCollider("circle")
  banana_Group.add(banana)
  

}}
