var bulletpaddle,bulletpaddleanimation;
var fireball,fireballanimation;
var paddle,paddleanimation;
var bulletpower,bulletpowerimg,extendedpower,extendedpowerimg,firepower,firepowerimg;
var tile1,tile1img,tile2,tile2img,tile3,tile3img,tile4,tile4img,tile5,tile5img,tile6,tile6img,tile7,tile7img,tile8,tile8img,tile9,tile9img,tile10,tile10img,;
var ball,ballimg;
var background,backgroundimg;
var bullet,bulletimg;
var extendedpaddle,extendedpaddleimg;
var life,lifeimg,restart,restartimg,start,startimg;
var laser,pop;
var gameState = "serve";

function preload(){
bulletpaddleanimation = loadAnimation("Images/BulletPaddle/bulletP1.png,Images/BulletPaddle/bulletP2.png,Images/BulletPaddle/bulletP3.png");
backgroundimg = loadImage("bg.png");
paddleanimation = loadAnimation("Images/NormalPaddle/paddle1.png,Images/NormalPaddle/paddle2.png,Images/NormalPaddle/paddle3.png");
extendedpaddleimg = loadImage("Images/extendedPaddle");
ballimg = loadImage("Images/ball.png");
lifeimg = loadImage("Images/life.png");
restartimg = loadImage("Images/restart.png");
startimg = loadImage("Images/start.png");
bulletimg = loadImage("Images/bullet.png");
bulletpowerimg = loadImage("Images/power-ups/bulletpower.png");
extendedpowerimg = loadImage("Images/power-ups/extendedpower.png");
firepowerimg = loadAnimation("Images/power-ups/firepower.png");
tile1img = loadImage("Images/tiles/tile1.png");
tile2img = loadImage("Images/tiles/tile2.png");
tile3img = loadImage("Images/tiles/tile3.png");
tile4img = loadImage("Images/tiles/tile4.png");
tile5img = loadImage("Images/tiles/tile5.png");
tile6img = loadImage("Images/tiles/tile6.png");
tile7img = loadImage("Images/tiles/tile7.png");
tile8img = loadImage("Images/tiles/tile8.png");
tile9img = loadImage("Images/tiles/tile9.png");
tile10img = loadImage("Images/tiles/tile10.png");
fireballanimation = loadAnimation("Images/fireball.png,Images/fireball2.png,Images/fireball3.png")
laser = loadSound("Audio/laser.mp3");
pop = loadSound("Audio/pop.mp3");
}
function setup(){
  var canvas = createCanvas(displayWidth,displayHeight);
     ball = createSprite(width/2,height/2);
     ball.addImage(ballimg);
     ball.scale = 0.2;
     
     paddle = createSprite(width/2,height-40);
     paddle.addAnimation("bulletpaddle",bulletpaddleanimation);

     
     paddle.addAnimation("normalpaddle",paddleanimation);

     paddle.addImage("extendedpaddle",extendedpaddleimg);

    start = createSprite(width/2,height/2+100);
    start.addImage(startimg);
    start.scale = 0.7;
    start.visible = true;

    resart = createSprite(width/2,height/2+100);
    restart.addImage(restartimg);
    restart.scale = 0.7;
    restart.visible = true;

    life = createSprite(40,40);
    life.addImage(lifeimg);
    life.scale = 0.4;

    score = 0;
    
    life = 3;

    tilegroup = new Group();
    bulletgroup = new Group();
    exendedgroup = new Group();
    firegroup = new Group();
    firegroup2 = new Group();
    bulletgroup2 = new Group();
}

function draw(){
  background(bg);
  if(gameState === "serve"){
start.visible = true;
restart.visible = false;
if(mousePressedOver(start)||touches.length>0){
  touches = []
gameState = "play";
ball.velocityX = -13;
ball.velocityY = 14;
}
  }

spawntile();
  if(gameState === "play"){
    start.visible = false;
    restart.visible = false;
    paddle.x = mouseX;
    if(ball.isTouching(paddle)){
      ball.y = ball.y-5;
      ball.velocityY = -ball.velocityY;
      
    }
    if(ball.y<=0){
      ball.velocityY = -ball.velocityY;
    }
    if(ball.x<=0){
      ball.velocityX = -ball.velocityX;
    }
    if(ball.x>=windowWidth){
      ball.velocityX = -ball.velocityX;
    }
    for(var i = 0;i<tilegroup.length;i++){
      if(tilegroup.get(i)!= null&&ball.isTouching(tilegroup.get(i))){
        tilegroup.get(i).destroy()
        ball.velocityY = -ball.velocityY;
        pop.play();
        score+=10;
      }
    }
    for(var i = 0 ;i<bulletgroup.length;i++){
      if(bulletgroup.get(i)!=null&&paddle.isTouching(bulletgroup.get(i))){
        bulletgroup.get(i).destroy();
        paddle.changeAnimation("bullet",bulletpaddleanimation);
        setTimeout(actualAnimation,2000);
        firebullet();
        Bullet.play();
      }
    }
    for(var i = 0 ;i<extendedgroup.length;i++){
      if(extendedgroup.get(i)!=null&&paddle.isTouching(extendedgroup.get(i))){
        extendedgroup.get(i).destroy();
        paddle.changeAnimation("extended",extendedpaddleAnimation);
        setTimeout(actualAnimation,2000);
       }
       for(var i = 0 ;i<firegroup.length;i++){
        if(firegroup.get(i)!=null&&paddle.isTouching(firegroup.get(i))){
          firegroup.get(i).destroy();
          paddle.changeAnimation("fire",firepowerimg);
          setTimeout(actualAnimation,2000);
         }
    }
    
  }
  }
  if(ball.y>=windowHeight+5&&ball.y<=windowHeight+20){
    lives--;
    ball.x = width/2;
    ball.y = height/2;
    if(lives === 0){
      gameState = end;
    }
  }
}
function spawntile (){
  
  for(var x = 52.5;x<windowWidth; x = x+windowWidth/30){
    for (var y = 100; y<=250;y=y+50){
      tile = createSprite(x,y);
      tile.scale = 0.25;
      tilegroup.add(tile);
    var rand = Math.round(random(1,10));
      switch (rand){
        case 1:
          tile.addImage(tile1img);
          break;
        case 2:
          tile.addImage(tile2img);
          break;
        case 3:
          tile.addImage(tile3img);
         break; 

         case 4:
          tile.addImage(tile4img);
         break; 
         
         case 5:
         tile.addImage(tile5img);
        break; 
        
        case 6:
        tile.addImage(tile6img);
       break;
        
       case 7:
       tile.addImage(tile7img);
      break; 
      
      case 8:
      tile.addImage(tile8img);
     break; 

     case 9:
        tile.addImage(tile9img);
        break;

    case 10:
    tile.addImage(tile10img);
    break;

    default:
break;
          
      }
    }
  }
  
}
    
function firepower(){
  if(frameCount%450===0){
    var rand = Math.round(random(10,windowWidth-10))
    firepower = createSprite(rand,0);
    firepower.addImage(firepowerimg);
    firepower.scale = 0.2;
    firepower.velocityY = 6;
    firegroup.add(firepower);

    
  }
}

function extendedpower(){
if(frameCount%250 ===0){
  var rand = Math.round(random(10,windowWidth-10))
  extendedpower = createSprite(rand,0);
  extendedpower.addImage(extendedpowerimg);
  extendedpower.scale = 0.2;
  extendedpower.velocityY = 6;
  extendedgroup.add(extendedpower);

}
}

function bulletpower(){
  if(frameCount%250 ===0){
    var rand = Math.round(random(10,windowWidth-10))
    bulletpower = createSprite(rand,0);
    bulletpower.addImage(bulletpowerimg);
    bulletpower.scale = 0.2;
    bulletpower.velocityY = 6;
    bulletgroup.add(bulletpower);
  }
}

function mouseDragged(){
  paddle.x = mouseX;
  
}