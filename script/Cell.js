function Cell(col, row, newStage){
    this.gridPos = new Point(col, row);
    //this.center = ;not sure how to calculate this, and what we need
    this.squire = null;
    this.stage = newStage;

    this.setSquire = function(newSquire) {
        squire = newSquire;
        //draw the squire.
    }

    this.getSquire = function() {
        return squire;
    }

    this.clearSquire = function() {
        squire = null;
        //undraw the squire
    }
}
