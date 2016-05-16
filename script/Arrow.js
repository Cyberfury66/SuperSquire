//Arrow Class creates arrow objects
function Arrow(height, stg){

    this.hasCollidedYet = false;
    this.shadowTex = PIXI.Texture.fromImage("assets\\shadow.png");
    this.shadowImg = new PIXI.Sprite(this.shadowTex);

    this.start;
    this.end;
    this.speed = 10;
    this.shadowMaxSize = 100;

    this.x = 0;
    this.stage = stg;
    this.spawned = false;
    this.redherring = false;

    this.hasCollided = function() {
        return this.hasCollidedYet;
    }
    //sets the arrows collided boolean
    this.setCollided = function(collided) {
        this.hasCollidedYet = collided;
    }
    //returns the arrows image for sprite
    this.getImg = function(){
        return this.img;
    }
    // sets the arrrows image for the sprite
    this.setImg = function(){
        var num = Math.floor((Math.random()*10) + 1);
        if(num == 5) {
            this.texture = PIXI.Texture.fromImage("assets\\fish.png");
            this.img = new PIXI.Sprite(this.texture);
            this.img.width = 100;
            this.img.height = 100;
            this.redherring = true;
        } else {
            this.texture = PIXI.Texture.fromImage("assets\\fireArrow.png");
            this.img = new PIXI.Sprite(this.texture);
            this.redherring = false;
        }
    }
    //returns the reherring boolean
    this.isRedherring = function() {
        return this.redherring;
    }
    //returns the arrows shadow image
    this.getShadowImg = function(){
        return this.shadowImg;
    }
    //sets the starting coordinates for the arrow
    this.setStart = function(){
        this.start = Math.floor((Math.random() * 3) + 1);
        //randomly chooses a staring cy coordinate
        if(this.start == 1){
            this.y = height/2;
            this.destinationRow = 1;
        } else if(this.start == 2){
            this.y = height/6;
            this.destinationRow = 0;
        } else {
            this.y = (height/6) * 5;
            this.destinationRow = 2;
        }
    }
    //sets the destination for the arrow
    this.setEnd = function(){
        this.end = Math.floor((Math.random() * 3) + 1);
        //checks to see if arrow is red herring then random sets x coordinate for destination
        if(this.redherring == false) {
            if(this.end == 1){
                this.destination = 800;
                this.destinationColumn = 2;
                this.shadowStartSize = 10;
            } else if(this.end == 2){
                this.destination = 685;
                this.destinationColumn = 1;
                this.shadowStartSize = 10;
            } else {
                this.destination = 570;
                this.destinationColumn = 0;
                this.shadowStartSize = 10;
            }
        } else {
            this.destination = 960;
        }
        this.timeTillHit = this.destination / this.speed;//calculates the time it will take to hit the target.

    }
    //returns the arrows x coordinate
    this.getX = function(){
        return this.x;
    }
    //returns the arrows y coordinate
    this.getY = function(){
        return this.y;
    }
    //returns the arrows destination
    this.getDestination = function(){
        return this.destination;
    }
    //returns the arrow's image's position
    this.getPosition = function(){
        return this.img.position.x;
    }
    //returns the arrows spawned boolean
    this.isSpawned = function(){
        return this.spawned;
    }
    //Moves the arrow base on its speed
    this.move = function(){
        //checks if arrow is red herring
        if(this.redherring == true) {
            this.img.position.x += this.speed;
            this.img.rotation += 0.05;
        } else {
            this.shadowImg.width += this.shadowGrowthSpeed;//Grows by the calculated growth speed every tick.
            this.shadowImg.height += this.shadowGrowthSpeed;
            this.img.position.x += this.speed;
        }
    }
    //create the arrow and it's shadow and sets them to the stage
    this.create = function(){
        this.shadowImg.width = this.shadowStartSize;
        this.shadowImg.height = this.shadowStartSize;
        this.stage.addChild(this.shadowImg);
        this.stage.addChild(this.img);

        this.spawned = true;

        this.shadowGrowthSpeed = (this.shadowMaxSize - this.shadowStartSize) / this.timeTillHit;//calculates how fast the shadow should grow to reach max size when the arrow hits.
    }
    //removes the arrow from the stage
    this.remove = function(){
        this.stage.removeChild(this.img);
        this.stage.removeChild(this.shadowImg);
        this.spawned = false;
    }
    //returns which row the arrow is going to
    this.getDestinationRow = function() {
        return this.destinationRow;
    }
    //returns the column that arrow is going to 
    this.getDestinationColumn = function() {
        return this.destinationColumn;
    }
}
