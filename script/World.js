//SPawn delay for arrows
World.spawnDelay = 200;
//Hpw many times spawn delay is called since a spawn
World.attemptsSinceSpawn = 200;
//minimun arrow spawn delay
World.minSpawnDelay = 50;
//The world spawns and draws all the elements of the game, as well as
//controlling the animation.
function World(newGame, h, w) {
    var div = document.getElementById('gameScreen');
    //Game will control the switching between screens.
    this.game = newGame;
    //The height of the stage.
    this.height = h;
    //The width of thes stage.
    this.width = w;
    //grid size 3
    const gridSize = 3;
    //spawn delay
    const delay = World.spawnDelay;
    //CenterAnchorPoint
    const centerAnchor = 0.5;
    //timer for arrow spawn
    const arrowSpawnTimer = 100;
    //Kite shield width and height
    const kshieldimgw = 0.17;
    const kshieldimgh = 0.31;
    //Wooden shield width and height
    const wshieldimgw = 0.18;
    const wshieldimgh = 0.33;
    //spell shield width and height
    const sshieldimgw = 0.17;
    const sshieldimgh = 0.40;
    //img size of Squire
    const SSimgSize = 125;
    //max destination
    const maxDest = 960;
    //score text x position
    const scoreTextPosX = this.width / 12 * 5;
    //anger text x position
    const angerTextPosX = this.width / 4;
    //arrow spawn attemp increment
    const spawnAttemptIncrement = 10;
    // position of first Column
    const firstColX = this.width / 40 * 27;
    //difference between columns
    const colXDiff = this.width / 40 * 5;
    //the y value of the first row
    const firstRowY = this.height / 6;
    //Shield Button x position
    const shieldButtonsX = this.width / 10;
    //Kite Shield Button y position
    const KshieldButtonY = this.height / 6;
    //Wooden Shield Button x position
    const WshieldButtonY = this.height / 2;
    //Shield Button x position
    const SshieldButtonY = this.height / 6 * 5;
    //Number of Arrows
    const maxArrowNum = 6;
    //Max Anger
    const maxAnger = 5;
    //An array of arrays of cells for a 3 by 3 grid.
    this.cells = [gridSize];
    //beginning value of anger meter
    var angerMeter = 0;
    //The users score.
    var score = 0;
    //A timer that spqwns arrows.
    var spawnTimer;

    //Pause boolean
    var paused = false;

    //An array of all the arrows that have been spqwned
    var arrows = [];
    //number of arrows spawned
    var arrowNum = 0;
    //The stage is where all the sprites are drawn.
    var stage = new PIXI.Stage(0x66FF99);

    //The PIXI renderer.
    var renderer = PIXI.autoDetectRenderer(this.width, this.height);

    var canvas = renderer.view;

    var touchHandler = new Hammer(canvas);

    touchHandler.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    //Text to show the score
    var scoreText = new PIXI.Text('Score: ' + score,{font : '24px Arial', fill : 0xffffff, align : 'center'});
    scoreText.position.x = scoreTextPosX;

    var angerText = new PIXI.Text('Anger: ' + angerMeter,{font : '24px Arial', fill : 0xffffff, align : 'center'});
    angerText.position.x = angerTextPosX;

    var spellTomeTexture = PIXI.Texture.fromImage("assets\\spellTome.png");
    var kiteShieldTexture = PIXI.Texture.fromImage("assets\\kiteShield.png");
    var woodShieldTexture = PIXI.Texture.fromImage("assets\\woodShield.png");

    //spawns arrows
    function spawnArrows(){
        if(paused == false) {
            if(World.attemptsSinceSpawn < World.spawnDelay) {
                World.attemptsSinceSpawn += spawnAttemptIncrement;
            } else {
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
                            arrows[k].getImg().anchor.x = centerAnchor;
                            arrows[k].getImg().anchor.y = centerAnchor;
                        } else {
                            arrows[k].getImg().anchor.x = 1;
                            arrows[k].getImg().anchor.y = centerAnchor;
                        }

                        // moves the arrows and the shadows sprites to there areas in the screen
                        arrows[k].getImg().position.x = arrows[k].getX();
                        arrows[k].getImg().position.y = arrows[k].getY();

                        //adds sprites to the stages
                        arrows[k].create();
                        arrowNum++;
                        break;
                    }
                }
                World.attemptsSinceSpawn = 0;
            }
        }
    }


    //Starts the game and initialises all necessary objects.
    this.init = function() {
        var yOfCell;
        var xOfCell;
        Arrow.movesTillHit = delay;
        World.spawnDelay = delay;

        //Instantiates the Cells.
        for(var col = 0; col < gridSize; col++) {
            this.cells[col] = [gridSize]
            //Calculates the x value of the center of the cell.
            xOfCell = firstColX + colXDiff * col;
            for(var row = 0; row < gridSize; row++) {
                //Calculates the y value of the center of the cell
                yOfCell = firstRowY + (this.height / gridSize) * row;
                this.cells[col][row] = new Cell(col, row, xOfCell, yOfCell);
            }
        }

        // add the renderer view element to the DOM
        div.appendChild(renderer.view);

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

        //PLACEHOLDER TILL REAL ART IS IN
        var pauseButton = new PIXI.Graphics();

        pauseButton.beginFill(0x0000FF, 1);
        //MAGIC NUMBERS WILL BE REPLACED WHEN ART IS DONE
        pauseButton.drawRect((this.width/18) * 17, 0, 50, 50);
        pauseButton.endFill();

        pauseButton.interactive = true;
        pauseButton.on('mousedown', togglePause);
        pauseButton.on('touchstart', togglePause);
        //PLACEHOLDER TILL REAL ART IS IN
        var exitButton = new PIXI.Graphics();

        exitButton.beginFill(0xFF0000, 1);
        //MAGIC NUMBERS WILL BE REPLACED WHEN ART IS DONE
        exitButton.drawRect((this.width/18) * 15, 0, 50, 50);
        exitButton.endFill();

        exitButton.interactive = true;
        exitButton.on('mousedown', exitGame);
        exitButton.on('touchstart', exitGame);

        var kiteShieldImg = new PIXI.Sprite(kiteShieldTexture);

        kiteShieldImg.anchor.x = centerAnchor;
        kiteShieldImg.anchor.y = centerAnchor;

        kiteShieldImg.position.x = shieldButtonsX;
        kiteShieldImg.position.y = KshieldButtonY;

        kiteShieldImg.width = this.width * kshieldimgw;
        kiteShieldImg.height = this.height * kshieldimgh;

        kiteShieldImg.interactive = true;
        kiteShieldImg.on('mousedown', changeToKite);
        kiteShieldImg.on('touchstart', changeToKite);

        var woodShieldImg = new PIXI.Sprite(woodShieldTexture);

        woodShieldImg.anchor.x = centerAnchor;
        woodShieldImg.anchor.y = centerAnchor;

        woodShieldImg.position.x = shieldButtonsX;
        woodShieldImg.position.y = WshieldButtonY;

        woodShieldImg.width = this.width * wshieldimgw;
        woodShieldImg.height = this.height * wshieldimgh;

        woodShieldImg.interactive = true;
        woodShieldImg.on('mousedown', changeToWood);
        woodShieldImg.on('touchstart', changeToWood);

        var spellTomeImg = new PIXI.Sprite(spellTomeTexture);

        spellTomeImg.anchor.x = centerAnchor;
        spellTomeImg.anchor.y = centerAnchor;

        spellTomeImg.position.x =  shieldButtonsX;
        spellTomeImg.position.y = SshieldButtonY;

        spellTomeImg.width = this.width * sshieldimgw;
        spellTomeImg.height = this.height * sshieldimgh;

        spellTomeImg.interactive = true;
        spellTomeImg.on('mousedown', changeToTome);
        spellTomeImg.on('touchstart', changeToTome);
        
        //The squire that the user controls.
        var squire = new Squire(woodShieldTexture, 2, this.cells[0][1], this);
        //Puts the squire in the right cell and draws it.
        squire.setCell(this.cells[0][1]);
        this.cells[0][1].setSquire(squire);
        squire.setImg();
        squireImg = squire.getImg();

        //Formats the squire image.
        squireImg.anchor.x = centerAnchor;
        squireImg.anchor.y = centerAnchor;
        squireImg.width = SSimgSize;
        squireImg.height = SSimgSize;
        squireImg.position.x = squire.getCell().getPxX();
        squireImg.position.y = squire.getCell().getPxY();

        //adds background to stage
        stage.addChild(backgroundImg);
        stage.addChild(kiteShieldImg);
        stage.addChild(woodShieldImg);
        stage.addChild(spellTomeImg);
        stage.addChild(scoreText);
        stage.addChild(angerText);
        stage.addChild(pauseButton);
        stage.addChild(exitButton);

        //create arrow objects and adds them to array list
        for(var i = 0; i < maxArrowNum; i++) {
            arrows[i] = new Arrow(this.width, this.height, stage);
            arrows[i].setImg();
        }
        //Adds the squire to the stage so it can be displayed.
        stage.addChild(squire.getImg());
        //Creates and stores an interval to spawn the arrows every 2 seconds.
        spawnTimer = setInterval( spawnArrows, arrowSpawnTimer);

    };

    //Moves he squire to the cell that is specified by the parameters.
    this.moveSquireTo = function(col, row) {
        this.cells[col][row].setSquire(squire);
        squire.setCell(this.cells[col][row]);
    };

    function changeToKite() {
        squire.setShield(kiteShieldTexture, 1);
    }

    function changeToWood() {
        squire.setShield(woodShieldTexture, 2);
    }

    function changeToTome() {
        squire.setShield(spellTomeTexture, 3);
    }

    function togglePause() {
        if(paused == false) {
            paused = true;
        } else {
            paused = false;
        }
    }

    function exitGame() {
        //removes all the arrows from the screen and the array.
        for(var j = 0; j < arrows.length; j++){
            arrows[j].remove();
        }
        //Stops more arrows from spawning
        clearInterval(spawnTimer);
        div.innerHTML = "";
        gameOver(h, w, score);
    }

    //Keyboard control function lis10er
    window.onkeydown = function(e) {
        //The code of the key that was pressed.
        var key = e.keyCode ? e.keyCode : e.which;
        if(paused == false) {
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
                    changeToKite();
                    //1
                    break;
                case 50:
                    changeToWood();
                    //2
                    break;
                case 51:
                    changeToTome();
                    // 3
                    break;
                case 48:
                    togglePause();
                    break;

                //Numpad Numbers - NumLock ON
                case 97:
                    changeToKite();
                    //1
                    break;
                case 98:
                    changeToWood();
                    //2
                    break;
                case 99:
                    changeToTome();
                    //3
                    break;
            }
        } else {
            //Keyboard Control inputs
            if(key == 48) {
                togglePause();
            }
        }
    }


    touchHandler.on('swipeup', function(ev) {
	       squire.moveNow(0);
    });

    touchHandler.on('swiperight', function(ev) {
	       squire.moveNow(1);
    });

    touchHandler.on('swipedown', function(ev) {
	       squire.moveNow(2);
    });

    touchHandler.on('swipeleft', function(ev) {
	       squire.moveNow(3);
    });

    //animates the sprites in the stage
    function animate() {
        if(paused == false) {
            squire.move();
            //runs through arrows array list and checks if it has reached it;s destination
            for(var j = 0; j < arrows.length; j++){
                if(arrows[j].isSpawned()) {
                    if(arrows[j].getPosition() >= arrows[j].getDestination()){
                        if(arrows[j].getDestination() != maxDest) {
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
            }
            scoreText.text = 'Score: ' + score;
            angerText.text = 'Anger: ' + angerMeter;
            // render the stage
            renderer.render(stage);
        }
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
                    if(arrow.arrowType() == squire.getShieldType()) {
                        score += 1;
                        if(World.spawnDelay > World.minSpawnDelay) {
                            World.spawnDelay--;
                        }
                        return;
                    }
                }
            }
            //This is a possible game over screen.
            angerMeter++;
            if(angerMeter >= maxAnger) {
                //removes all the arrows from the screen and the array.
                for(var j = 0; j < arrows.length; j++){
                    arrows[j].remove();
                    arrowNum--;
                }
                //Stops more arrows from spawning
                clearInterval(spawnTimer);
                div.innerHTML = "";
                gameOver(h, w, score);
            }

        }
    }
}
