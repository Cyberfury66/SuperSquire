//A point object that has an x and a y. We have been told this is bad design for
//JavaScript so we will get rid of it.
function Point(x, y) {
    //The x value of the point.
    this.x = x;
    //The y value of the point.
    this.y = y;

    //Returns the x value of the Point.
    this.getX = function() {
        return x;
    };

    //Returns the y value of the Point.
    this.getY = function() {
        return y;
    };
}
