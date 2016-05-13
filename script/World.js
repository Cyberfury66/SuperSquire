
function World(newGame) {
    this.cells = [3];
    this.game = newGame;//might not need this
    var score = 0;

    var arrows = [];
    arrowNum = 0;

    var stage = new PIXI.Stage(0x66FF99);
    this.height = 480;
    this.width = 854;
    var renderer = PIXI.autoDetectRenderer(this.width, this.height);
    var text = new PIXI.Text('Score: ' + score,{font : '24px Arial', fill : 0xff1010, align : 'center'});
    text.positiion.x = this.width / 3;

    //spawn arrows
    function spawnArrows(){
        for(var k = 0; k < arrows.length; k++){
            if(arrows[k].isSpawned() == false){
                arrows[k].setImg();
                arrows[k].setStart();
                arrows[k].setEnd();
                arrows[k].setCollided(false);

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
            this.cells[col] = [3]
            xOfCell = 570 + 115 * col;
            for(var row = 0; row < 3; row++) {
                yOfCell = this.height / 6 + (this.height / 3) * row;
                this.cells[col][row] = new Cell(col, row, xOfCell, yOfCell);
            }
        }
        var squire = new Squire("woodShield", this.cells[0][1]);
        squire.setCell(this.cells[0][1]);
        this.cells[0][1].setSquire(squire);
        squire.setImg();
        squireImg = squire.getImg();

        squireImg.anchor.x = 0.5;
        squireImg.anchor.y = 0.5;
        squireImg.width = 125;
        squireImg.height = 125;
        squireImg.position.x = squire.getCell().getPxX();
        squireImg.position.y = squire.getCell().getPxY();
        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        requestAnimationFrame( animate );

        var backgroundTexture = PIXI.Texture.fromImage("assets\\bg_no_score.jpg");
        var backgroundImg = new PIXI.Sprite(backgroundTexture);



        backgroundImg.anchor.x = 0;
        backgroundImg.anchor.y = 0;

        backgroundImg.position.x = 0;
        backgroundImg.position.y = 0;

        backgroundImg.width = this.width;
        backgroundImg.height = this.height;

        stage.addChild(backgroundImg);
        stage.addChild(text);

        //create arrows
        for(var i = 0; i < 6; i++) {
            arrows[i] = new Arrow(this.height, stage);
            arrows[i].setImg();
        }
        stage.addChild(squire.getImg());
        setInterval( spawnArrows, 2000);

    };

    this.moveSquireTo = function(col, row) {
        this.cells[col][row].setSquire(squire);
        squire.setCell(this.cells[col][row]);
    };

    //Keyboard control function listener
    window.onkeydown = function(e) {

        var moveDistance = 100;
        var key = e.keyCode ? e.keyCode : e.which;

        //Keyboard Control inputs
        switch(key) {
            //Arrow Keys
            case 37: squire.moveNow(3); //left
            break;
            case 38: squire.moveNow(0); //up
            break;
            case 39: squire.moveNow(1); //right
            break;
            case 40: squire.moveNow(2); //down
            break;

            //W A S D
            case 65: squire.moveNow(3); //left
            break;
            case 68: squire.moveNow(1); //right
            break;
            case 83: squire.moveNow(2); //down
            break;
            case 87: squire.moveNow(0); //up
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
        squire.move();
        for(var j = 0; j < arrows.length; j++){
            if(arrows[j].getPosition() >= arrows[j].getDestination()){
                if(arrows[j].getDestination() != 960) {
                    checkCollision(arrows[j]);
                }
                arrows[j].remove();
                arrowNum--;
            } else {
                arrows[j].move();
            }
        }
        text.text = 'Score: ' + score;
        // render the stage
        renderer.render(stage);
    }

    function checkCollision(arrow) {
        if(!arrow.hasCollided()) {
            arrow.setCollided(true);
            if(arrow.getDestinationRow() == squire.getCell().getRow()) {
                if(arrow.getDestinationColumn() == squire.getCell().getCol()) {
                    score += 1;
                    return;
                }
            }
            //document.location.href = "gameOver.html";
            for(var j = 0; j < arrows.length; j++){
                arrows[j].remove();
            }
            clearInterval(spawnTimer);
            setTimeout("location.reload()", 3000);
        }
    }
}
