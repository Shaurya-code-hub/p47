  var bg;
  var Indian_soldier;
  var knife;
  var enemy, enemy2;
  var boss, bossImg;
  var bullet, bullet2;
  var bulletImg, bullet2Img;
  var bulletSound, bullet2Sound;
  var enemyGroup, bulletGroup;
  var deathSound;
  var score = 0;
  var walking; 

function preload(){
  bg = loadImage("images/BG4.jpg");
  Indian_soldierImg = loadImage("images/Indian soldier.png");
  enemyImg = loadImage("images/enemy.png");
  enemy2Img= loadImage("images/enemy2-removebg-preview.png");
  bossImg = loadImage("images/bosss.png");
 
  bulletSound = loadSound("sound/Bullet.mp3");
  bulletImg = loadImage("images/bullet1.png");
  bullet2Img = loadImage("images/bullet.png");

  deathSound = loadSound("sound/death.mp3");

  bullet2Sound = loadSound("sound/BossShot.mp3");

  walking = loadSound("sound/Walking.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 120);

  Indian_soldier = createSprite(40,250,20,20);
  Indian_soldier.addImage(Indian_soldierImg);
  Indian_soldier.scale = 0.3;
  
  boss = createSprite(1200,250);
  boss.addImage(bossImg);
  boss.scale = 0.5;
  boss.visible = false;

  enemyGroup = new Group(); 
  bulletGroup = new Group();
}


function draw() {
  background(bg); 
  
  textSize(20);
  fill("#FFFFFF");
  text("Score: " + score, 80, 30);  
   
 
  if(Indian_soldier.y > 0 && keyDown ("up_arrow")){
   Indian_soldier.y = Indian_soldier.y - 8;
   //walking.play();
  }

  if(Indian_soldier.y < displayHeight - 120 && keyDown ("down_arrow")){
    Indian_soldier.y = Indian_soldier.y + 8;  
    //walking.play();
  }
   
  if(Indian_soldier.x < displayWidth/4 && keyDown ("right_arrow")){
    Indian_soldier.x = Indian_soldier.x + 8;  
    //walking.play();
  }

  if(Indian_soldier.x > 0 ){
    if(keyDown ("left_arrow")){
      Indian_soldier.x = Indian_soldier.x - 8; 
      //walking.play();
    }
  }

  if(score === 10){
    boss.visible = true;
    // boss.debug = true;
    boss.setCollider("rectangle", 0, 0, 300, 400);
    enemyGroup.destroyEach();

    
    if(boss!= null  && frameCount % 50 === 0){
      bullet2 = createSprite(boss.x, boss.y);
      bullet2.addImage(bullet2Img);
      bullet2.scale = 0.5
      bullet2.velocityX = -20;
      bullet2Sound.play();

      if(bullet2.isTouching(Indian_soldier)){
        Indian_soldier.destroy();
      }

      bulletGroup.add(bullet2);
    }

    if(bullet.isTouching(boss)){
      boss.destroy();
      bullet.destroy();
      bulletGroup.destroyEach();
    }
  }
  

  spawnEnemy();

   drawSprites();


   if(keyWentDown("space")){
    spawnBullet();
    
    }

    
}

function spawnEnemy(){
  if(frameCount % 80 === 0 ){
    enemy = createSprite(displayWidth, Math.round(random(80,displayHeight - 150)));
    enemy.velocityX = -18;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: enemy.addImage(enemyImg);
              enemy.scale = 0.3;
              break;
      case 2: enemy.addImage(enemy2Img);
              enemy.scale = 0.3;
              break;
    }
    //enemy.debug = true;
    enemy.setCollider("rectangle", 0, 0, 390, 390);
    enemyGroup.add(enemy);          
  }

  if(enemyGroup.isTouching(bullet)){
    console.log("aaa");
    enemyGroup.destroyEach();
    bullet.destroy();
    deathSound.play();
    score = score + 10;
  }
}

function spawnBullet(){
  bullet = createSprite(Indian_soldier.x, Indian_soldier.y,20,5);
  bullet.addImage(bulletImg);
 //bullet.debug = true;
  bullet.setCollider("rectangle", 0, 0, 100, 20);
  bullet.scale = 0.2;
  bullet.velocityX = 20;
  // bullet.shapeColor = "	#FFFF00"

  bulletSound.play();
  
  
}

