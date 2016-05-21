//A Cell can hold a squire.
function Cell(col, row, pX, pY){
    //Which column and row it is in the grid.
    this.column = col
    this.row = row;
    //The squire that is in the cell.
    this.squire = null;
    //The x value of the center of the cell
    this.pX = pX;
    //The y value of the center of the cell
    this.pY = pY;

    //Sets squire to the squire that is passed in.
    this.setSquire = function(newSquire) {
        squire = newSquire;
    }

    //Returns the squire that is in this cell.
    this.getSquire = function() {
        return squire;
    }

    //Sets the squire to null.
    this.clearSquire = function() {
        squire = null;
    }

    //Returns the y value of the center of the cell
    this.getPxY = function(){
        return pY;
    }

    //Returns the x value of the center of the cell
    this.getPxX = function(){
        return pX;
    }

    //Returns the row the cell is in.
    this.getRow = function() {
      return this.row;
    }

    //Returns the column the cell is in.
    this.getCol = function() {
      return this.column;
    }
}
