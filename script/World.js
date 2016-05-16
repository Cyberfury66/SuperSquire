//The world spawns and draws all the elements of the game, as well as
//controlling the animation.
function World(newGame) {
    //An array of arrays of cells for a 3 by 3 grid.
    this.cells = [3];
    //Game will control the switching between screens.
    this.game = newGame;
    //The users score.
    var score = 0;
    //A timer that spqwns arrows.
    var spawnTimer;

    //An array of all the arrows that have been spqwned
    var arrows = [];
    //How many arrows have been spawned.
    arrowNum = 0;

    //The stage is where all the sprites are drawn.
    var stage = new PIXI.Stage(0x66FF99);
    //The height of the stage.
    this.height = 480;
    //The width of thes stage.
    this.width = 854;
    //The PIXI renderer.
    var renderer = PIXI.autoDetectRenderer(this.width, this.height);
    //Text to show the score
    var text = new PIXI.Text('Score: ' + score,{font : '24px Arial', fill : 0xffffff, align : 'center'});
    text.position.x = this.width / 3;

    //spawns arrows
    function spawnArrows(){
        //runs through array =list of arrow objects
        for(var k = 0; k < arrows.length; k++){
            //checks to see if arrows are currently spawned
            if(arrows[k].isSpawned() == false){
                arrows[k].setImg();
                arrows[k].setStart();
                arrows[k].setEnd();
                arrows[k].setCollided(false);

                // checks if arrow is red herring and centers the sprite's anchor point
                if(arrows[k].isRedherring() == true) {
                    arrows[k].getImg().anchor.x = 0.5;
                    arrows[k].getImg().anchor.y = 0.5;
                } else {
                    arrows[k].getImg().anchor.x = 1;
                    arrows[k].getImg().anchor.y = 0.5;
                }

               //centers the shadow's sprite's anchor point
                arrows[k].getShadowImg().anchor.x = 0.5;
                arrows[k].getShadowImg().anchor.y = 0.5;

                // moves the arrows and the shadows sprites to there areas in the screen
                arrows[k].getImg().position.x = arrows[k].getX();
                arrows[k].getImg().position.y = arrows[k].getY();

                arrows[k].getShadowImg().position.x = arrows[k].getDestination();
                arrows[k].getShadowImg().position.y = arrows[k].getY();

                //adds sprites to the stages
                arrows[k].create();
                arrowNum++;
                break;
            }
        }
    }


    //Starts the game and initialises all necessary objects.
    this.init = function() {
        var yOfCell;
        var xOfCell;

        //Instantiates the Cells.
        for(var col = 0; col < 3; col++) {
            this.cells[col] = [3]
            //Calculates the x value of the center of the cell.
            xOfCell = 570 + 115 * col;
            for(var row = 0; row < 3; row++) {
                //Calculates the y value of the center of the cell
                yOfCell = this.height / 6 + (this.height / 3) * row;
                this.cells[col][row] = new Cell(col, row, xOfCell, yOfCell);
            }
        }

        //The squire that the user controls.
        var squire = new Squire("woodShield", this.cells[0][1]);
        //Puts the squire in the right cell and draws it.
        squire.setCell(this.cells[0][1]);
        this.cells[0][1].setSquire(squire);
        squire.setImg();
        squireImg = squire.getImg();

        //Formats the squire image.
        squireImg.anchor.x = 0.5;
        squireImg.anchor.y = 0.5;
        squireImg.width = 125;
        squireImg.height = 125;
        squireImg.position.x = squire.getCell().getPxX();
        squireImg.position.y = squire.getCell().getPxY();
        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        //Starts the animation loop.
        requestAnimationFrame( animate );

        //sets background texture and image
        var backgroundTexture = PIXI.Texture.fromImage("assets\\bg_no_score.jpg");
        var backgroundImg = new PIXI.Sprite(backgroundTexture);

        //anchors backgrouind image
        backgroundImg.anchor.x = 0;
        backgroundImg.anchor.y = 0;
        //sets background images position
        backgroundImg.position.x = 0;
        backgroundImg.position.y = 0;
        //sets background images size
        backgroundImg.width = this.width;
        backgroundImg.height = this.height;
        //adds background to stage
        stage.addChild(backgroundImg);
        stage.addChild(text);

        //create arrow objects and adds them to array list
        for(var i = 0; i < 6; i++) {
            arrows[i] = new Arrow(this.height, stage);
            arrows[i].setImg();
        }
        //Adds the squire to the stage so it can be displayed.
        stage.addChild(squire.getImg());
        //Creates and stores an interval to spawn the arrows every 2 seconds.
        spawnTimer = setInterval( spawnArrows, 2000);

    };

    //Moves he squire to the cell that is specified by the parameters.
    this.moveSquireTo = function(col, row) {
        this.cells[col][row].setSquire(squire);
        squire.setCell(this.cells[col][row]);
    };

    //Keyboard control function listener
    window.onkeydown = function(e) {
        //The code of the key that was pressed.
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

            //Regular Numbers: will be for changing shields, for now changes
            //the spawn rate of arrows.
            case 49:
                clearInterval(spawnTimer);
                spawnTimer = setInterval( spawnArrows, 2000);
                //shieldSwitch(type parameter); //1
                break;
            case 50:
                clearInterval(spawnTimer);
                spawnTimer = setInterval( spawnArrows, 1250);
                //shieldSwitch(type parameter); //2
                break;
            case 51:
                clearInterval(spawnTimer);
                spawnTimer = setInterval( spawnArrows, 500);
                //shieldSwitch(type parameter); // 3
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

    //animates the sprites in the stage
    function animate() {

        squire.move();
        //runs through arrows array list and checks if it has reached it;s destination
        for(var j = 0; j < arrows.length; j++){
            if(arrows[j].getPosition() >= arrows[j].getDestination()){
                if(arrows[j].getDestination() != 960) {
                    //checks if arrow hit shield or ground
                    checkCollision(arrows[j]);
                }
                //removes arrow after it reaches destination
                arrows[j].remove();
                arrowNum--;
            } else {
                //moves arrows if they have not reached destination
                arrows[j].move();
            }
        }
        text.text = 'Score: ' + score;
        // render the stage
        renderer.render(stage);
        //recursivly calls the animte fucntion
        requestAnimationFrame( animate );
    }

    //Checks if an arrow's destination is occupied by the squire, then increments
    //score if the arrow was blocked, or reloads the page if not.
    function checkCollision(arrow) {
        //Makes sure this is the first timw checkCollision was called on this arrow.
        if(!arrow.hasCollided()) {
            //Tells the arrow checkCollision() has been called oon it
            arrow.setCollided(true);
            //Checks if the squire is in the right square.
            if(arrow.getDestinationRow() == squire.getCell().getRow()) {
                if(arrow.getDestinationColumn() == squire.getCell().getCol()) {
                    score += 1;
                    return;
                }
            }
            //This is a possible game over screen.
            //document.location.href = "gameOver.html";

            //removes all the arrows from the screen and the array.
            for(var j = 0; j < arrows.length; j++){
                arrows[j].remove();
            }
            //Stops more arrows from spawning
            clearInterval(spawnTimer);
            //Reloads the page after 1.5 seconds.
            setTimeout("location.reload()", 1500);
        }
    }
}
