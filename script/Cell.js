function Cell(col, row, pX, pY){
    this.gridPos = new Point(col, row);
    //this.center = ;not sure how to calculate this, and what we need
    this.squire = null;
    this.pX = pX;
    this.pY = pY;
    console.log("" + this.gridPos.getX() + " " + this.gridPos.getY() + " " + pX + " " + pY + "\n");

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

    this.getPxY = function(){
        return pY;
    }

    this.getPxX = function(){
        return pX;
    }

    this.getY = function() {
      return this.gridPos.getY();
    }

    this.getX = function() {
      return this.gridPos.getX();
    }
}
