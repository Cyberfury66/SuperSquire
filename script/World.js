
function World(newGame) {
    this.cells = [3];
    this.game = newGame;//might not need this

    var arrows = [];
    arrowNum = 0;

    var stage = new PIXI.Stage(0x66FF99);
    this.height = 480;
    this.width = 854;
    var renderer = PIXI.autoDetectRenderer(this.width, this.height);

//spawn arrows
function spawnArrows(){
    for(var k = 0; k < arrows.length; k++){
        if(arrows[k].isSpawned() == false){
            arrows[k].setImg();
            arrows[k].setStart();
            arrows[k].setEnd();

            // center the sprites anchor point
            if(arrows[k].isRedherring() == true) {
                arrows[k].getImg().anchor.x = 0.5;
                arrows[k].getImg().anchor.y = 0.5;
            } else {
                arrows[k].getImg().anchor.x = 1;
                arrows[k].getImg().anchor.y = 0.5;
            }

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



    this.init = function() {
        var yOfCell;
        var xOfCell;

        for(var col = 0; col < 3; col++) {
            yOfCell = this.height / 6 + (this.height / 3) * col;
            this.cells[col] = [3]
            for(var row = 0; row < 3; row++) {
                xOfCell = 570 + 115 * row;
                this.cells[col][row] = new Cell(col, row, xOfCell, yOfCell);
            }
        }
        this.squire = new Squire("woodShield", null);
        this.squire.setCell(this.cells[1][0]);
        this.cells[1][0].setSquire(this.squire);
        this.squire.setImg();
        this.squireImg = this.squire.getImg();

        this.squireImg.anchor.x = 0.5;
        this.squireImg.anchor.y = 0.5;
        this.squireImg.width = 125;
        this.squireImg.height = 125;
        console.log(this.squire.getCell().getPxX());
        console.log(this.squire.getCell().getPxY());
        this.squireImg.position.x = this.squire.getCell().getPxX();
        this.squireImg.position.y = this.squire.getCell().getPxY();
        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        requestAnimationFrame( animate );

        var backgroundTexture = PIXI.Texture.fromImage("assets\\bg_plain.jpg");
        var backgroundImg = new PIXI.Sprite(backgroundTexture);


        backgroundImg.anchor.x = 0;
        backgroundImg.anchor.y = 0;

        backgroundImg.position.x = 0;
        backgroundImg.position.y = 0;

        backgroundImg.width = this.width;
        backgroundImg.height = this.height;

        stage.addChild(backgroundImg);

        //create arrows
        for(var i = 0; i < 6; i++) {
          arrows[i] = new Arrow(this.height, stage);
          arrows[i].setImg();
        }
        stage.addChild(this.squire.getImg());
        setInterval( spawnArrows, 2000);

    };

    //Keyboard control function listener
window.onkeydown = function(e) {
  var moveDistance = 100;
  var key = e.keyCode ? e.keyCode : e.which;

//Keyboard Control inputs
  switch(key) {
    //Arrow Keys
    case 37: this.squire.move(3); //left
    break;
    case 38: this.squire.move(0); //up
    break;
    case 39: this.squire.move(1); //right
    break;
    case 40: this.squire.move(2); //down
    break;

    //W A S D
    case 65: woodS.position.x -= moveDistance; //A
    break;
    case 68: woodS.position.x += moveDistance; //D
    break;
    case 83: woodS.position.y += moveDistance; //S
    break;
    case 87: woodS.position.y -= moveDistance; //W
    break;

    //Regular Numbers
    case 49: //shieldSwitch(type parameter); //1
    break;
    case 50: //shieldSwitch(type parameter); //2
    break;
    case 51: //shieldSwitch(type parameter); // 3
    break;

    //Numpad Numbers - NumLock ON
    case 97: //shieldSwitch(type parameter); //1
    break;
    case 98: //shieldSwitch(type parameter); //2
    break;
    case 99: //shieldSwitch(type parameter); //3
    break;
  }
}


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


    this.moveSquireTo = function(col, row, currentCell) {
        this.cells[col][row].setSquire(currentCell.getSquire());
        currentCell.clearSquire();
    };
}
