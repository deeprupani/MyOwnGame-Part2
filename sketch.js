var player, playerImage;
var backgroundImage, Background;
var pickaxe, pickaxeGroup, pickaxeImage;
var gameState = "STORY"
var spaceCount = 0
var monkeyImage, monkeyGroup;
var Score = 0;
var HP = 15;
var maxPickaxes = 120;
var wolf, wolfImage, wolfGroup;
var berry, berryImage, berryGroup;
var resetButton;
var boss1, bossImage
var boss1HP = 100;
var bossMusic,winMusic;
var resetButton,resetImg;
var Timer=20;
var banana,bananaImage,bananaGroup;

function preload() {
  playerImage = loadImage("Images/player1.png");
  backgroundImage = loadImage("Images/jungle.jpg");
  pickaxeImage = loadImage("Images/pickaxe1.png")
  monkeyImage = loadImage("Images/Monkey.png")
  wolfImage = loadImage("Images/wolf.png");
  berryImage = loadImage("Images/berry.png");
  bossImage = loadImage("Images/boss1.png");
  bossMusic = loadSound("Images/Defeat.mp3");
  winMusic=loadSound("Images/Win.mp3");
  bananaImage=loadImage("Images/boss1Weapon.png");
}

function setup() {
  createCanvas(1000, 400);

  pickaxeGroup = new Group();
  monkeyGroup = new Group();
  wolfGroup = new Group();
  berryGroup = new Group();
  bananaGroup=new Group();

  Background = createSprite(0, 0);
  Background.addImage(backgroundImage);
  Background.scale = 1.5
  Background.velocityX = -5;
  Background.visible = false;

  player = createSprite(100, 200, 50, 50);
  player.addImage(playerImage);
  player.scale = 0.4
  player.visible = false;

  boss1 = createSprite(800, 0, 50, 50);
  boss1.addImage(bossImage);
  boss1.scale = 0.6;
  boss1.visible = false;

}

function draw() {
  background(255, 255, 255);

  if (spaceCount === 0) {
    gameState = "TIPS"
  }

  if (gameState === "TIPS") {
    background(0);

    drawSprites();
    textSize(32)
    fill("red")
    text("Crio's Great Rescue", 300, 50);
    text("Collect Jellies to Stay Alive", 200, 100);
    text("Stay away from the Monkeys", 200, 150);
    text("Collect The Power Ups for a Special Ability", 200, 200);
    text("Fight Bosses at the end of each level", 200, 250);
    text("What  are you waiting for ,GO RESCUE CRIO!!", 200, 300);

    textSize(18);
    fill("blue");
    text("Press Space  key to Start the Game", 650, 50)

    if (keyCode === 32) {
      gameState = "PLAY"
    }
  }

  if (gameState === "PLAY") {
    background(0);

    Background.visible = true;
    player.visible = true;

    if (frameCount % 60 === 0) {
      var monkey = createSprite(100, 200, 30, 30);
      monkey.x = Math.round(random(800, 950))
      monkey.y = Math.round(random(50, 260));
      monkey.addImage(monkeyImage);
      monkey.scale = 0.4
      monkey.velocityX = -5
      monkey.lifetime = 130
      monkeyGroup.add(monkey)
    }

    if (frameCount % 150 === 0) {
      var wolf = createSprite(100, 200, 30, 30);
      wolf.x = Math.round(random(800, 950))
      wolf.y = Math.round(random(50, 260));
      wolf.addImage(wolfImage);
      wolf.scale = 0.4
      wolf.velocityX = -8
      wolf.lifetime = 130
      wolfGroup.add(wolf)
    }

    if (frameCount % 300 === 0) {
      var berry = createSprite(100, 200, 30, 30);
      berry.x = Math.round(random(500, 700))
      berry.y = Math.round(random(50, 260));
      berry.addImage(berryImage);
      berry.scale = 0.2
      berry.velocityX = -2
      berry.lifetime = 110
      berryGroup.add(berry)
    }

    if (Background.x < 400) {
      Background.x = width / 2
      Background.x = Background.width / 2;
    }

    if (Background.velocityX === -5) {
      Score++
    }

    if(mouseX>500){
      player.x=200;
      player.y=150;
    }

    if(mouseX<=500){
    player.x = World.mouseX;
    player.y = World.mouseY;
    }

    if(mouseY>=275){
      player.x=200;
      player.y=150;

    }

    if (Score >= 750) {
      // bossMusic.play();
      background.velocityX = 0;
      berryGroup.destroyEach();
      boss1.visible = true;

      wolfGroup.destroyEach();
      monkeyGroup.destroyEach();

      if (frameCount % 50 === 0) {
        boss1.x = Math.round(random(500, 950))
        boss1.y = Math.round(random(50, 250))

     banana = createSprite(boss1.x, boss1.y, 30, 30);
      banana.addImage(bananaImage);
      banana.scale = 0.2
      banana.velocityX = -8
      banana.lifetime = 110
      bananaGroup.add(banana)
      }
    }

    if (keyDown("SPACE")) {
      createPickaxes();
    }

    if (pickaxeGroup.isTouching(monkeyGroup)) {
      monkeyGroup.destroyEach();

    }

    if (pickaxeGroup.isTouching(boss1)) {
      boss1HP = boss1HP - 10
      pickaxeGroup.destroyEach();

    }

    if (pickaxeGroup.isTouching(wolfGroup)) {
      wolfGroup.destroyEach();
    }

    if (pickaxeGroup.isTouching(berryGroup)) {
      berryGroup.destroyEach();
      HP = HP + 3;
    }

    if (wolfGroup.isTouching(player)) {
      HP = HP - 2
      wolfGroup.destroyEach();
    }

    if (monkeyGroup.isTouching(player)) {
      Score = 0
      monkeyGroup.destroyEach();
    }

    if (bananaGroup.isTouching(player)) {
    bananaGroup.destroyEach();
   // HP=HP-4
    }

    if (boss1HP <= 0) {
 
      background(0);
      winMusic.play();
      wolfGroup.visible=false;
      berryGroup.visible=false;
      monkeyGroup.visible=false;
      boss1.visible=false;
      player.visible=false;
      pickaxeGroup.visible=false;
      Background.visible = false;

      textSize(32);
      fill("red");
      text("Level 1 Cleared", 450, 250)
      text("You Win", 450, 150)
      text("Timer:"+Timer,450,100)


      if(frameCount%10===0){
        Timer--
        
      }

      if(Timer===0){
        gameState="PLAY"
          boss1HP=100
          maxPickaxes=75;
          HP=15;
          Score=0;
          player.visible=true;
          wolfGroup.visible=true;
          berryGroup.visible=true;
          monkeyGroup.visible=true;
        }
    }

    if (HP <= 0 || maxPickaxes <= 0 ) {
      
      background(0);
      bossMusic.play();
      wolfGroup.visible=false;
      berryGroup.visible=false;
      monkeyGroup.visible=false;
      boss1.visible=false;
      player.visible=false;
pickaxeGroup.visible=false;
      Background.visible = false;

      textSize(32);
      fill("red");
      text("You Lose", 500, 250);
       text("Timer:"+Timer,500,150)

      if(frameCount%10===0){
        Timer--
        
      }

      if(Timer===0){
      gameState="PLAY"
        boss1HP=100
        maxPickaxes=75;
        HP=15;
        Score=0;
        player.visible=true;
        wolfGroup.visible=true;
        berryGroup.visible=true;
        monkeyGroup.visible=true;
      }
    }
    drawSprites();

    fill("yellow")
    text("Score:" + Score, 550, 50)
    text("HP:" + HP, 400, 50)
    text("MaxPickaxes:" + maxPickaxes, 750, 50)
    text("Level 1",250,50)

    if (Score >= 750) {
      text("BossHP:" + boss1HP, boss1.x-50, boss1.y-75)
    }
  }

}

function createPickaxes() {
  pickaxe = createSprite(player.x, player.y, 30, 50);
  pickaxe.addImage(pickaxeImage);
  pickaxe.velocityX = 10;
  pickaxe.scale = 0.2;
  pickaxe.lifetime = 100;
  pickaxeGroup.add(pickaxe);
  maxPickaxes--
}


