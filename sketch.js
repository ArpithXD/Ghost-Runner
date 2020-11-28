  var tower, towerImage;
  var door, doorImage, doorg;
  var cl,clImage,clg;
  var ghost, ghostImage;
  var ib,ibg;
  
  var PLAY = 1;
  var END = 0;
  var gameState = 1;

  var spookySound;


  function preload() {
    towerImage = loadImage("tower.png");
    doorImage = loadImage("door.png");
    clImage = loadImage("climber.png");
    ghostImage = loadImage("ghost-standing.png");
    
    spookySound = loadSound("spooky.wav");

  }

  function setup() {
    createCanvas(600,600);
    spookySound.loop();

    //tower
    tower = createSprite(300,300);
    tower.addImage(towerImage);
    tower.velocityY = 1;
    
    //ghost
    ghost = createSprite(200,200,50,50);
    ghost.addImage(ghostImage);
    ghost.scale = 0.3;
    


    //creating groups
    doorg = new Group();
    clg = new Group();
    ibg = new Group();


  }


  function draw() {

     background(0);
 
    if (gameState === 1) {
    //creating infine background
    if (tower.y > 600) {
      tower.y = 300;
    }

    //making ghost jump if space key is pressed
    if (keyDown("space")) {
      ghost.velocityY = -15;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    //making ghost move
    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 3;
    }
    
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 3;
    }

    //making ghost sensitive to climbers
    if (ghost.isTouching(clg)) {
      ghost.velocityY = 0;
    }
    
    if (ibg.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = 0;
    }
    
    
    spawnDoors();
    drawSprites();
      
    }
    
    if (gameState === 0) {
      fill("yellow");
      textSize(30);
      text("Game Over!", 230,250);
      
      
      
      
      
      
    }
  }

   function spawnDoors() {
     
     if (frameCount%240 === 0) {
       
       door = createSprite(200,-50);
       door.addImage(doorImage);
       door.x = Math.round(random(120,400));
       door.velocityY = 1;
       door.lifetime = 615;
       doorg.add(door);
       ghost.depth = door.depth;
       ghost.depth += 1;
       
       cl = createSprite(200,10);
       cl.addImage(clImage);       
       cl.x = door.x;
       cl.velocityY = 1;
       cl.lifetime = 615;
       clg.add(cl);
       
       ib = createSprite(200,15);
       ib.width = cl.width;
       ib.height = 2;
       ib.x = door.x;
       ib.velocityY = 1;
       ib.debug = true;
       ibg.add(ib);
       
     }
     
     
     
     
     
     
     
     
     
     
   }







































