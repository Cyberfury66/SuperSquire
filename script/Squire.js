//The squire that the player controls.
function Squire(startingShield, startingType, startingCell, newWorld) {
    //The shield that the squire is holding.
    this.currentShield = startingShield;
    //The cell that the squire is occupying.
    this.currentCell = startingCell;
    //The world that the squire is in.
    this.world = newWorld

    this.blockType = startingType
    //boolean for if shield is flickering
    this.flickering = false;
    //boolean for if shield is transparent
    this.transparent = false;
    //the alpha value for the shield image
    var alphaNum = 1;
    //the shield image
    var img;
    //the intervals that the shield flickers at
    var flickerInter;
    const flickerDuration = 1000;
    const flickerRate = 10;
    //how much shield is pushed back after blocking
    const blockPushBack = 10;


    //Changes which shield the squire is holding.
    this.setShield = function(newShield, blockType) {
        this.blockType = blockType
        currentShield = newShield;
        img.texture = currentShield;
        img.width = this.world.width / 8;
        img.height = this.world.width / 8;
    };

    //Moves the squire the direction that is passed in.
    this.moveNow = function(direction) {
        switch (direction) {
           case 0:
               this.moveUp();
               break;

           case 1:
               this.moveRight();
               break;

           case 2:
               this.moveDown();
               break;

           case 3:
               this.moveLeft();
               break;

           default:
               break;
        }
    };

    //sets the squires image
    this.setImg = function() {
        img = new PIXI.Sprite(this.currentShield);
        img.alpha = alphaNum;
        img.width = this.world.width / 8;
        img.height = this.world.width / 8;
    }
    //gets the image for the squire
    this.getImg = function() {
        return img;
    }

    //Moves the squire up one cell if there is a cell to move to.
    this.moveUp = function() {
        if(this.currentCell.getRow() != 0) {
            this.world.moveSquireTo(this.currentCell.getCol(), this.currentCell.getRow() - 1);
        }
    };

    //Moves the squire up one cell if there is a cell to move to.
    this.moveRight = function() {
        if(this.currentCell.getCol() != 2) {
            this.world.moveSquireTo(this.currentCell.getCol() + 1, this.currentCell.getRow());
        }
    };

    //Moves the squire up one cell if there is a cell to move to.
    this.moveDown = function() {
        if(this.currentCell.getRow() != 2) {
            this.world.moveSquireTo(this.currentCell.getCol(), this.currentCell.getRow() + 1);
        }
    };

    //Moves the squire up one cell if there is a cell to move to.
    this.moveLeft = function() {
        if(this.currentCell.getCol() != 0) {
            this.world.moveSquireTo(this.currentCell.getCol() - 1, this.currentCell.getRow());
        }
    };

    //Returns the shield that the squire is holding.
    this.getShieldType = function() {
        return this.blockType;
    };

    //Changes the cell that the squire is in.
    this.setCell = function(newCell) {
        this.currentCell = newCell;
    };

    //Returns the cell that squire is in.
    this.getCell = function() {
        return this.currentCell;
    }

    //adds squires sprite to stage
    this.create = function(){
      this.stage.addChild(img);
    }

    //Sets the squire's position to the center of the cell it is occupying.
    this.move = function(){
      img.position.x = this.currentCell.getPxX();
      img.position.y = this.currentCell.getPxY();
    }
    //pushes shield back after successfully blocking
    this.blockEffect = function(){
        img.position.x += blockPushBack;
    }
    //makes the shield flicker if arrow is blocked with incorrect shield
    this.startFlicker = function() {
        this.flickering = true;
        flickerInter = setInterval(this.flicker, flickerRate);
        setTimeout(this.stopFlicker, flickerDuration);
    }
    //stops shield from flickering
    this.stopFlicker = function() {
        this.flickering = false;
        img.alpha = 1;
        clearInterval(flickerInter);
    }
    //chages the sheilds alpha from 0 to 1 and vice versa
    this.flicker = function() {
        if(this.transparent == false) {
            img.alpha = 0;
            this.transparent = true
        } else {
            img.alpha = 1;
            this.transparent = false;
        }
    }

}
