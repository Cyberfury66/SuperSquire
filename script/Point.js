function Point(x, y) {
    this.x = x;
    this.y = y;

    this.getX = function() {
        return x;
    };

    this.getY = function() {
        return y;
    };
}
