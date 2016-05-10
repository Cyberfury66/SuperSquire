function setShield(newShield) {
    this.currentShield = newShield;
}

function move(direction) {
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
}

function moveUp() {
    with(this) {
        if(currentCell.getY() != 0) {
            setCell(currentCell.getX(), currentCell.getY()+1);//This will probably have to be a Game method, which means that Squire needs a reference.
            this.position = currentCell.getCenter();
        }
    }
}

function moveRight() {
    with(this) {
        if(currentCell.getX() != 2) {
            setCell(currentCell.getX()+1, currentCell.getY());
            this.position = currentCell.getCenter();
        }
    }
}

function moveDown() {
    with(this) {
        if(currentCell.getY() != 2) {
            setCell(currentCell.getX(), currentCell.getY()-1);
            this.position = currentCell.getCenter();
        }
    }
}

function moveLeft() {
    with(this) {
        if(currentCell.getX() != 0) {
            setCell(currentCell.getX()-1, currentCell.getY());
            position = currentCell.getCenter();
        }
    }
}

function getPosition() {
    return this.position;
}

function getShield() {
    return this.currentShield;
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

    this.getPosition = getPosition;
    this.getShield = getShield;
}
