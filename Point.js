function getX() {
    return x;
}

function getY() {
    return y;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.getX = getX;
    this.getY = getY;
}
