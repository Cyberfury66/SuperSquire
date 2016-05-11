function world(newStage, newGame) {
    this.stage = newStage;
    this.cells = [3];
    this.stageHeight = stage.height;//Is this how you do it?
    this.stageWidth = stage.width;
    this.game = newGame;//might not need this
    this.spawnTimer = NULL;

    this.init = function() {
        for(var col = 0; col < 3; col++) {
            cells[col] = [3]
            for(var row = 0; row < 3; row++) {
                cells[col][row] = new Cell(col, row);
            }
        }

        spawnSquire() {
            cells[0][1].setSquire(new Squire("woodShield", cells[0][1], cells[0][1].getCenter));
        }

        spawnTimer = setInterval('spawnArrow();', 3000);
    }
}
