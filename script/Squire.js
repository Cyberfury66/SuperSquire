function Squire(startingShield, startingCell) {
    this.currentShield = startingShield;
    this.currentCell = startingCell;

    this.setShield = function(newShield) {
        currentShield = newShield;
    };

    this.move = function(direction) {
        switch (direction) {
           case 0:
               moveUp();
               break;

           case 1:
               moveRight();
               break;

           case 2:
               moveDown();
               break;

           case 3:
               moveLeft();
               break;

           default:
               break;
        }
    };

    this.setImg = function() {
        this.texture = PIXI.Texture.fromImage("assets\\" + this.currentShield + ".png");
        this.img = new PIXI.Sprite(this.texture);
    }
    this.getImg = function() {
        return this.img;
    }
    this.moveUp = function() {
        if(currentCell.getY() != 0) {
            moveSquireTo(currentCell.getX(), currentCell.getY()+1);//This will probably have to be a Game method, which means that Squire needs a reference.
            position = currentCell.getCenter();
        }
    };

    this.moveRight = function() {
        if(currentCell.getX() != 2) {
            moveSquireTo(currentCell.getX()+1, currentCell.getY());
            position = currentCell.getCenter();
        }
    };

    this.moveDown = function() {
        if(currentCell.getY() != 2) {
            moveSquireTo(currentCell.getX(), currentCell.getY()-1);
            position = currentCell.getCenter();
        }
    };

    this.moveLeft = function() {
        if(currentCell.getX() != 0) {
            moveSquireTo(currentCell.getX()-1, currentCell.getY());
            position = currentCell.getCenter();
        }
    };

    this.getPosition = function() {
        return position;
    };

    this.getShield = function() {
        return currentShield;
    };

    this.setCell = function(newCell) {
        currentCell = newCell;
    };

    this.getCell = function() {
        return this.currentCell;
    }

    this.create = function(){
      this.stage.addChild(this.img);

    }
}
