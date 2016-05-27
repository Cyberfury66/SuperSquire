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
    //Anger increment amount
    const angerIncrement = 25;
    //pause button height
    const pauseButtonHeight = 25;
    //pause button width
    const pauseButtonWidth = 50;
    //An array of arrays of cells for a 3 by 3 grid.
    this.cells = [gridSize];
    //beginning value of anger meter
    var anger = 0;
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
    //variable for touch controls
    var touchHandler = new Hammer(canvas);
    //type of shield collision
    var shieldCollision;

    touchHandler.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    //shield textures
    var spellTomeTexture = PIXI.Texture.fromImage("assets\\shield_tome.png");
    var spellTomeTexture2 = PIXI.Texture.fromImage("assets\\spellTome.png");
    var kiteShieldHands = PIXI.Texture.fromImage("assets\\shield_kite.png");
    var kiteShieldTexture = PIXI.Texture.fromImage("assets\\kiteShield.png");
    var woodShieldHands = PIXI.Texture.fromImage("assets\\shield_wood.png");
    var woodShieldTexture = PIXI.Texture.fromImage("assets\\woodShield.png");
    //anger sound effect
    var angerSound = new Howl({
      urls: ["audio/angry.ogg", "audio/angry.mp3"],
      volume: 0.5,
    });
    //thud sound effect
    var thud = new Howl({
      urls: ["audio/thud.ogg", "audio/thud.mp3"],
      volume: 0.5,
    });

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
        var backgroundTexture = PIXI.Texture.fromImage("assets\\bg.jpg");
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
        //pause button
        $("#pButton").click(togglePause);
        //kite shield imamge
        var kiteShieldImg = new PIXI.Sprite(kiteShieldTexture);
        //anchor kite shield button
        kiteShieldImg.anchor.x = centerAnchor;
        kiteShieldImg.anchor.y = centerAnchor;
        //posisiton kiteShield button
        kiteShieldImg.position.x = shieldButtonsX;
        kiteShieldImg.position.y = KshieldButtonY;
        //sizes kiteShield button
        kiteShieldImg.width = this.width * kshieldimgw;
        kiteShieldImg.height = this.height * kshieldimgh;
        //Makes kite shield image a button
        kiteShieldImg.interactive = true;
        kiteShieldImg.on('mousedown', changeToKite);
        kiteShieldImg.on('touchstart', changeToKite);
        //wooden shield image
        var woodShieldImg = new PIXI.Sprite(woodShieldTexture);
        //Anchors wooden shield
        woodShieldImg.anchor.x = centerAnchor;
        woodShieldImg.anchor.y = centerAnchor;
        //positions wooden shield
        woodShieldImg.position.x = shieldButtonsX;
        woodShieldImg.position.y = WshieldButtonY;
        //sizes wooden shield
        woodShieldImg.width = this.width * wshieldimgw;
        woodShieldImg.height = this.height * wshieldimgh;
        //makes wooden shield image a button
        woodShieldImg.interactive = true;
        woodShieldImg.on('mousedown', changeToWood);
        woodShieldImg.on('touchstart', changeToWood);
        //book shield image
        var spellTomeImg = new PIXI.Sprite(spellTomeTexture2);
        //set anchor of book shield
        spellTomeImg.anchor.x = centerAnchor;
        spellTomeImg.anchor.y = centerAnchor;
        //posistions book shield
        spellTomeImg.position.x =  shieldButtonsX;
        spellTomeImg.position.y = SshieldButtonY;
        //sizes book shield
        spellTomeImg.width = this.width * sshieldimgw;
        spellTomeImg.height = this.height * sshieldimgh;
        //makes book shield a button
        spellTomeImg.interactive = true;
        spellTomeImg.on('mousedown', changeToTome);
        spellTomeImg.on('touchstart', changeToTome);

        //The squire that the user controls.
        var squire = new Squire(woodShieldHands, 2, this.cells[0][1], this);
        //Puts the squire in the right cell and draws it.
        squire.setCell(this.cells[0][1]);
        this.cells[0][1].setSquire(squire);
        squire.setImg();
        squireImg = squire.getImg();

        //Formats the squire image.
        squireImg.anchor.x = centerAnchor;
        squireImg.anchor.y = centerAnchor;
        squireImg.position.x = squire.getCell().getPxX();
        squireImg.position.y = squire.getCell().getPxY();

        //adds background to stage
        stage.addChild(backgroundImg);
        stage.addChild(kiteShieldImg);
        stage.addChild(woodShieldImg);
        stage.addChild(spellTomeImg);
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
    //changes avatar shield to kite shield
    function changeToKite() {
        squire.setShield(kiteShieldHands, 1);
    }
    //changes avatar shield to wooden shield
    function changeToWood() {
        squire.setShield(woodShieldHands, 2);
    }
    //changes avatar shield to book shield
    function changeToTome() {
        squire.setShield(spellTomeTexture, 3);
    }
    //toggles pause
    function togglePause() {
        if(paused == false) {
            paused = true;
        } else {
            paused = false;
        }
    }
    //exits game
    function exitGame() {
        //removes all the arrows from the screen and the array.
        for(var j = 0; j < arrows.length; j++){
            arrows[j].remove();
        }
        //Stops more arrows from spawning
        clearInterval(spawnTimer);
        gameOver(score, stage);
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

    //swipe up event listener
    touchHandler.on('swipeup', function(ev) {
	       squire.moveNow(0);
    });
    //swipe right event listener
    touchHandler.on('swiperight', function(ev) {
	       squire.moveNow(1);
    });
    //swipe down event listener
    touchHandler.on('swipedown', function(ev) {
	       squire.moveNow(2);
    });
    //swipe left event listener
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
                        if(!arrows[j].isRedherring()) {
                            //checks if arrow hit shield or ground
                            shieldCollision = checkCollision(arrows[j]);
                            //checks is arrow hit correct shield
                            if (shieldCollision == 1) {
                                squire.blockEffect();
                            } else if (shieldCollision == 0) {
                                squire.startFlicker();
                            }
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
            // render the stage
            renderer.render(stage);
        }
        //recursivly calls the animte fucntion
        requestAnimationFrame( animate );
    }
    //updates angermeter and checks if game should be over
    function angerUpdate() {
        //This is a possible game over screen.
        anger++;
        angerSound.play();
        $('.progress-bar').css('width', (anger * angerIncrement)+'%').attr('aria-valuenow', anger * angerIncrement);

        if(anger >= maxAnger) {
            //removes all the arrows from the screen and the array.
            for(var j = 0; j < arrows.length; j++){
                arrows[j].remove();
                arrowNum--;
            }

            if(score > window.userInfo.hiScore) {
                window.userInfo.hiScore = score;
            }
            //Stops more arrows from spawning
            clearInterval(spawnTimer);
            //request code taken from http://stackoverflow.com/questions/9713058/sending-post-data-with-a-xmlhttprequest
            var http = new XMLHttpRequest();
            var url = "php/updateUser.php";
            var params = "&username=" + window.userInfo.userName
                + "&hiScore=" + window.userInfo.hiScore
                + "&herringClicked=" + window.userInfo.herringClicked
                + "&arrowsBlocked=" + window.userInfo.arrowsBlocked
                + "&herringsSeen=" + window.userInfo.herringsSeen;
            http.open("POST", url, true);

            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            http.send(params);
            gameOver(score, stage);
        }
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
                        window.userInfo.arrowsBlocked++;
                        if(window.userInfo.arrowsBlocked == 100) {
                            alert("Achievement get:\nThen we shall fight in the shade.\n You have blocked 100 arrows!");
                        }
                        thud.play();
                        $('#scoreTextIG').text("Score: " + score);
                        if(World.spawnDelay > World.minSpawnDelay) {
                            World.spawnDelay--;
                        }
                        return 1;
                    } else {
                        angerUpdate();
                        return 0;
                    }
                }
            }
            angerUpdate();
            return 2;
        }
    }
}
