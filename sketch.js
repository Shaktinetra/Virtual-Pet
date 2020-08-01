var dog, dogImg, happyDogImg, database, food, foodStock

function preload() {
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  textSize(20);
  fill(255);

  dog = createSprite(250, 250, 20, 20);
  dog.addImage("dog", dogImg);
  dog.addImage("happy", happyDogImg);
  dog.scale = 0.25;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
  background(46, 139, 87);
  text ("Note: Press The Up Arrow", 10, 30);
  text("Food Remaining: " + food, 250, 100);

  if (keyWentDown(UP_ARROW)) {
    writeStock(food);
    dog.changeAnimation("happy", happyDogImg);
    foodStock = foodStock - 1;
  }

  drawSprites();
}

function readStock(data) {
  food = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update ({
    Food: x
  })
}
