function setShield(newShield) {
    currentShield = newShield;
}

function move(direction) {
    switch (direction) {
       case condition 0:
       moveUp();
       break;

       case condition 1:
       moveRight();
       break;
       ...

       case condition 2:
       moveDown();
       break;

       case condition 3:
       moveLeft();
       break;

       default:
       break;
    }
}

function moveUp() {
    if(currentCell.getY() != 0) {
        setCell(currentCell.getX(), currentCell.getY()+1);//This will probably have to be a Game method, which means that Squire needs a reference.
        position = currentCell.getCenter();
    }
}

function moveRight() {
    if(currentCell.getX() != 2) {
        setCell(currentCell.getX()+1, currentCell.getY());
        position = currentCell.getCenter();
    }
}

function moveDown() {
    if(currentCell.getY() != 2) {
        setCell(currentCell.getX(), currentCell.getY()-1);
        position = currentCell.getCenter();
    }
}

function moveLeft() {
    if(currentCell.getX() != 0) {
        setCell(currentCell.getX()-1, currentCell.getY()-1);
        position = currentCell.getCenter();
    }
}

function Squire(startingShield, startingCell, startingPosition) {
    this.currentShield = startingShield;
    this.currentCell = startingCell;
    this.position = startingPosition;

    this.setShield = setShield;

    this.move = move;
    //this.moveUp = moveUp;
    //this.moveRight = moveRight;
    //this.moveDown = moveDown;
    //this.moveLeft = moveLeft;
}
