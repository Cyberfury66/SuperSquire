var arrows = [];
var arrowNum = 0;

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance.
var height = 480;
var width = 854;

var renderer = PIXI.autoDetectRenderer(width, height);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
renderer.backgroundColor = 0xEB0E0E;

requestAnimationFrame( animate );


var backgroundTexture = PIXI.Texture.fromImage("bg_plain.jpg");
var backgroundImg = new PIXI.Sprite(backgroundTexture);

backgroundImg.anchor.x = 0;
backgroundImg.anchor.y = 0;

backgroundImg.position.x = 0;
backgroundImg.position.y = 0;

backgroundImg.width = width;
backgroundImg.height = height;

stage.addChild(backgroundImg);

//create arrows
for(var i = 0; i < 6; i++) {
  console.log(i);
  arrows[i] = new Arrow(height, stage);
}

//spawn arrows
function spawnArrows(){
  for(var k = 0; k < arrows.length; k++){
    if(arrows[k].isSpawned() == false){
      arrows[k].setStart();
      arrows[k].setEnd();
      // center the sprites anchor point
      arrows[k].getImg().anchor.x = 1;
      arrows[k].getImg().anchor.y = 0.5;

      arrows[k].getShadowImg().anchor.x = 0.5;
      arrows[k].getShadowImg().anchor.y = 0.5;

      // move the sprite t the center of the screen
      arrows[k].getImg().position.x = arrows[k].getX();
      arrows[k].getImg().position.y = arrows[k].getY();

      arrows[k].getShadowImg().position.x = arrows[k].getDestination();
      arrows[k].getShadowImg().position.y = arrows[k].getY();


      arrows[k].create();
      arrowNum++;
      break;
    }
  }
}

setInterval("spawnArrows();", 2000);

function animate() {
  requestAnimationFrame( animate );

for(var j = 0; j < arrows.length; j++){

  if(arrows[j].getPosition() == arrows[j].getDestination()){
    arrows[j].remove();
    arrowNum--;
  } else {
    arrows[j].move();
  }

}
// render the stage
renderer.render(stage);
}
