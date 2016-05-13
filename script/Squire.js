function Squire(startingShield, startingCell, newWorld) {
    this.currentShield = startingShield;
    this.currentCell = startingCell;
    this.world = newWorld;

    this.setShield = function(newShield) {
        currentShield = newShield;
    };

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

    this.setImg = function() {
        this.texture = PIXI.Texture.fromImage("assets\\" + this.currentShield + ".png");
        this.img = new PIXI.Sprite(this.texture);
    }
    this.getImg = function() {
        return this.img;
    }
    this.moveUp = function() {
        if(this.currentCell.getRow() != 0) {
            world.moveSquireTo(this.currentCell.getCol(), this.currentCell.getRow() - 1);
        }
    };

    this.moveRight = function() {
        if(this.currentCell.getCol() != 2) {
            world.moveSquireTo(this.currentCell.getCol() + 1, this.currentCell.getRow());
        }
    };

    this.moveDown = function() {
        if(this.currentCell.getRow() != 2) {
            world.moveSquireTo(this.currentCell.getCol(), this.currentCell.getRow() + 1);
        }
    };

    this.moveLeft = function() {
        if(this.currentCell.getCol() != 0) {
            world.moveSquireTo(this.currentCell.getCol() - 1, this.currentCell.getRow());
        }
    };

    this.getShield = function() {
        return this.currentShield;
    };

    this.setCell = function(newCell) {
        this.currentCell = newCell;
    };

    this.getCell = function() {
        return this.currentCell;
    }

    this.create = function(){
      this.stage.addChild(this.img);

    }

    this.move = function(){
      this.img.position.x = this.currentCell.getPxX();
      this.img.position.y = this.currentCell.getPxY();
    }
}
