var PLAY = 1;
var END = 0;
var gameState = 1;

var swordimage, sword;

var f1, f2, f3, f4, fruit1;
var r;
var a1;
var score;
var gameverimage
var cutfruit,aliensound
var position,position1,position2


function preload() {
  swordimage = loadImage("sword.png");

  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");

  a1 = loadAnimation("alien1.png", "alien2.png");
  gameoverimage = loadImage("gameover.png");
  cutfruit=loadSound("knifeSwooshSound.mp3");
  aliensound=loadSound("gameover.mp3");
}


function setup() {
  createCanvas(600, 600);
  sword = createSprite(40, 200, 20, 20);
  fruitGroup = createGroup();
  alienGroup = createGroup();
  score = 0
}


function draw() {
  background("lightblue")
  text("score  " + score, 500, 50)
  if (gameState === PLAY) {
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
       cutfruit.play();
      score = score + 1
     
    }
     swanpfruit1();
  alien1();
  }
    if (sword.isTouching(alienGroup)) {
      gameState = END
      aliensound.play();
    }
  
  if (gameState === END) {

    fruitGroup.setVelocityXEach(0)
    sword.addImage('swordlabel', gameoverimage);
    sword.x = 300
    sword.y = 200
    sword.scale=2
  }


  drawSprites();
  swanpsword();
 

}

function swanpsword() {

  sword.addImage('swordlabel', swordimage);
  sword.scale = 0.6
  sword.y = World.mouseY;
  sword.x = World.mouseX;
}

function swanpfruit1() {
  if (World.frameCount % 80 === 0) {
    fruit1 = createSprite(400, 200, 20, 20)
    fruit1.scale = 0.2
    position=Math.round(random(1,2));
    if(position ==1)
      {
        fruit1 .x=400
        fruit1.velocityX=-(7+score/4)
      }
    else
      {
        if(position ==2){
           fruit1 .x=0  
          fruit1.velocityX=(7+score/10);
        }
        }
    
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit1.addImage(f1);
    } else if (r == 2) {
      fruit1.addImage(f2);
    } else if (r == 3) {
      fruit1.addImage(f3);
    } else if (r == 4) {
      fruit1.addImage(f4);
    }
    fruit1.y = Math.round(random(50, 340));
    //fruit1.velocityX = -7
    fruit1.lifetime = 100
    fruitGroup.add(fruit1);
  }
}

function alien1() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("killing", a1);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -8
    monster.lifetime = 100
    alienGroup.add(monster);
  }
}