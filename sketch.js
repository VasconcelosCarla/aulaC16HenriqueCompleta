//referencia para bibliotecas p5.js: https://p5js.org/libraries/
var score = 0;
var cacto;   
var cacto1;
var cacto2;
var cacto3;
var cacto4;   
var cacto5;
var cacto6;
var dino, dinoImg, dinoAnima;  
var bordas;
var solo, soloImg;
var soloInvi;
var nuvem;
var nuvemImg;
var dinoColide;
var grupoCactos
var grupoNuvens
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg, gameOver, restart, restartImg;
var jumpSoung, depthSound;


function preload(){
  dinoImg = loadImage("trex1.png");
  dinoAnima = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");     
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png"); 
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  dinoColide = loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSoung = loadSound("jump.mp3");
  depthSound = loadSound("die.mp3");
}

function setup(){
  createCanvas(600,200);
  
  dino = createSprite(50, 160, 20, 50);
  //dino.addImage(dinoImg);
  dino.addAnimation("correndo", dinoAnima);
  dino.scale = 0.5;
  bordas = createEdgeSprites();
  solo = createSprite(200, 180, 400, 20);
  
  solo.addImage(soloImg);
  solo.x = solo.width/2;
  soloInv = createSprite(200, 190, 400, 10);
  soloInv.visible = false;
  grupoCactos = new Group;
  grupoNuvens = new Group;
  dino.setCollider("circle",0,0,40);
  dino.debug = true

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

}
function draw(){
  background("white");
  text ("PONTOS: "+ score,500,50);
 
  if(gameState === PLAY){
   solo.velocityX = -4;
   score = score + Math.round(frameCount/60);
   if (solo.x <= 0){
    solo.x = solo.width/2;
   }
   // controles dino :
   if(keyDown("space")&&dino.y >= 100){
    dino.velocityY = -10;
    //jumpSong.play
   }
   //dino.velocityY = dino.velocityY + 0.8;
   dino.velocityY += 0.8;
   gerarNuvem();
   gerarCacto();
   if(grupoCactos.isTouching(dino)){
    gameState = END;
   depthSound.play()
   }
   
  }

  else if (gameState === END){

    gameOver.visible = true;
    restart.visible = true;

    solo.velocityX = 0;
    dino.velocityY = 0;
    grupoCactos.setVelocityXEach(0);
    grupoNuvens.setVelocityXEach(0);
    //mudar animação do dino:
    dino.changeAnimation("collided",dinoColide);
    //definir tempo de vida dos obstaculos destruidos:
    grupoCactos.setLifetimeEach(-1);
    grupoNuvens.setLifetimeEach(-1);
    
  }
  

  //dino.collide(bordas[3]);
  dino.collide(soloInv);
  console.log(solo.x);
  //atividade: fazer o solo ser reiniciado -> solo infinito!!!

  //console.log(frameCount);

  textSize(24);
  //text(mouseX+","+mouseY, mouseX, mouseY);
  drawSprites();   
}
function gerarNuvem(){
  if(frameCount%150 === 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(nuvemImg);
    nuvem.scale = random(0.5,0.8);
    nuvem.velocityX = -3;
    nuvem.lifetime = 210;
    //tempo = distancia/velocidade 600/3 = 200s.
    //ajuste de profundidade
    nuvem.depth = dino.depth;
    dino.depth = dino.depth + 1;
    grupoNuvens.add(nuvem)
    }
}
function gerarCacto(){
  if(frameCount%100 === 0){
      cacto = createSprite(400,165,10,40);
      cacto.velocityX = -6;
      var nomeQualquer = Math.round(random(1,6));
      switch(nomeQualquer){

        case 1: cacto.addImage(cacto1);
        break;
        case 2: cacto.addImage(cacto2);
        break;
        case 3: cacto.addImage(cacto3);
        break;
        case 4: cacto.addImage(cacto4);
        break;
        case 5: cacto.addImage(cacto5);
        break;
        case 6: cacto.addImage(cacto6);
        break;
        default:break;
      }
    cacto.scale = 0.6;
    cacto.lifetime = 300;
    grupoCactos.add(cacto);
  }
}