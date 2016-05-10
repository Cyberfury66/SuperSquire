function getX() {
    return this.x;
}

function getY() {
    return this.y;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.getX = getX;
    this.getY = getY;
}
