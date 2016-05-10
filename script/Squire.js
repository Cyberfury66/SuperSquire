function Squire(startingShield, startingCell, startingPosition) {
    this.currentShield = startingShield;
    this.currentCell = startingCell;
    this.position = startingPosition;

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

    this.moveUp = function() {
        if(currentCell.getY() != 0) {
            setCell(currentCell.getX(), currentCell.getY()+1);//This will probably have to be a Game method, which means that Squire needs a reference.
            position = currentCell.getCenter();
        }
    };

    this.moveRight = function() {
        if(currentCell.getX() != 2) {
            setCell(currentCell.getX()+1, currentCell.getY());
            position = currentCell.getCenter();
        }
    };

    this.moveDown = function() {
        if(currentCell.getY() != 2) {
            setCell(currentCell.getX(), currentCell.getY()-1);
            position = currentCell.getCenter();
        }
    };

    this.moveLeft = function() {
        if(currentCell.getX() != 0) {
            setCell(currentCell.getX()-1, currentCell.getY());
            position = currentCell.getCenter();
        }
    };

    this.getPosition = function() {
        return position;
    };

    this.getShield = function() {
        return currentShield;
    };
}
