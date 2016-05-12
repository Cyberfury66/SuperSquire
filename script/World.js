
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
        for(var col = 0; col < 3; col++) {
            this.cells[col] = [3]
            for(var row = 0; row < 3; row++) {
                this.cells[col][row] = new Cell(col, row);
            }
        }

        this.cells[0][1].setSquire(new Squire("woodShield", this.cells[0][1], this.cells[0][1].getCenter));

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

        setInterval( spawnArrows, 2000);

    };


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
