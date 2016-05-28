//Static image variables for arrows
Arrow.iceTex = PIXI.Texture.fromImage("assets\\arrow_ice.png");
Arrow.fireTex = PIXI.Texture.fromImage("assets\\arrow_fire.png");
Arrow.magicTex  = PIXI.Texture.fromImage("assets\\arrow_magic.png");
Arrow.fishTex = PIXI.Texture.fromImage("assets\\fish.png");
Arrow.movesTillHit = 200;
Arrow.minMoves = 100;

//Arrow Class creates arrow objects
function Arrow(width, height, stg){
    this.hasCollidedYet = false;
    //starting y point
    this.start;
    //ending x point
    this.end;
    //the max shadow size and starting size
    const shadowMaxSize = width/20;
    const shadowStartSize = shadowMaxSize/10;
    //The chance of a redherring spawning as in 1/herringChance
    const herringChance = 100;
    //Width and Height of the arrows
    const aWidth = width/8;
    const aHeight = width/8;
    //The thrid type of arrow, magic
    const arrowTypeNum = 3;
    //The third destination number, start number and row number
    const numOfDestination = 3;
    const numOfStart = 3;
    const numOfRows = 3;
    //The x value of the middle of the first column
    const firstColX = width / 40 * 27;
    //The difference of the x values of two adjacent columns
    const colWidthDiff = width/40 *5;
    //The y values of three possible row targets
    const start1 = (height/6) * 5;
    const start2 =  height/6;
    const start3 = height/2;
    //How much the red herring rotates per animation frame
    const herringRotation = 0.05;
    //The starting opacity of the shadow
    const shadowAlpha = 0.025;

    //Arrow shot sound effect
    var arrowShoot = new Howl ({
      urls: ["audio/bow_fired.ogg", "audio/bow_fired.mp3"],
      volume: 0.5,
    });

    this.x = 0;
    this.stage = stg;
    this.spawned = false;
    this.redherring = false;
    this.type = 0;

    this.shadow = new PIXI.Graphics();
    this.radius = 0;
    this.shadowColor = 0x000000;
    //returns the has collided yet boolean
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
        var num = Math.floor((Math.random()* herringChance) + 1);
        if(num == 1) {
            this.img = new PIXI.Sprite(Arrow.fishTex);
            this.img.width = aWidth;
            this.img.height = aHeight;
            this.redherring = true;
            window.userInfo.herringsSeen++;
            this.img.interactive = true;
            this.img.on('mousedown', redHerringClicked);
            this.img.on('touchstart', redHerringClicked);
        } else {
            var type = Math.floor((Math.random()*arrowTypeNum) + 1);
            //sets arrow image based on arrow type
            if(type == 1){
                this.img = new PIXI.Sprite(Arrow.fireTex);
                this.img.width = aWidth;
                this.img.height = aHeight;
                this.type = 1;
                this.img.interactive = false;
            } else if(type == arrowTypeNum - 1){
                this.img = new PIXI.Sprite(Arrow.iceTex);
                this.img.width = aWidth;
                this.img.height = aHeight;
                this.type = arrowTypeNum - 1;
                this.img.interactive = false;
            } else if(type == arrowTypeNum){
                this.img = new PIXI.Sprite(Arrow.magicTex);
                this.img.width = aWidth;
                this.img.height = aHeight;
                this.type = arrowTypeNum;
                this.img.interactive = false;
            }
            this.redherring = false;
        }
    }

    function redHerringClicked() {
        window.userInfo.herringClicked = 1;
        alert("Achievement get:\n\"Clearly a Red Herring.\"\n Why would you click that? It was a red herring!");
    }

    //returns arrow type
    this.arrowType = function() {
            return this.type;
        }

    //returns the reherring boolean
    this.isRedherring = function() {
        return this.redherring;
    }

    //sets the starting coordinates for the arrow
    this.setStart = function(){
        this.start = Math.floor((Math.random() * numOfStart) + 1);
        //randomly chooses a staring cy coordinate
        if(this.start == numOfStart){
            this.y = start1;
            this.destinationRow = numOfRows - 1;
        } else if(this.start == numOfStart - 1){
            this.y = start2;
            this.destinationRow = 0;
        } else {
            this.y = start3;
            this.destinationRow = 1;
        }
    }
    //sets the destination for the arrow
    this.setEnd = function(){
        this.end = Math.floor((Math.random() * numOfDestination) + 1);
        //checks to see if arrow is red herring then random sets x coordinate for destination
        if(this.redherring == false) {
            if(this.end == 1){
                this.destinationColumn = numOfDestination - 1;
            } else if(this.end == numOfDestination - 1){
                this.destinationColumn = 1;
            } else {
                this.destinationColumn = 0;
            }
            this.destination = firstColX + colWidthDiff * this.destinationColumn;
            this.speed = this.destination / Arrow.movesTillHit;
            if(Arrow.movesTillHit > Arrow.minMoves){
                Arrow.movesTillHit -= 2;
            }
        } else {
            this.destination = width;
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
        if(this.spawned == true){
            if(this.redherring == true) {
                this.img.position.x += this.speed;
                this.img.rotation += herringRotation;
            } else {
                this.radius += this.shadowGrowthSpeed;//Grows by the calculated growth speed every tick.
                this.shadow.beginFill(this.shadowColor, 1);  //(thickness, color)
        		this.shadow.drawCircle(this.destination, this.y, this.radius);   //(x,y,radius)
                this.shadow.alpha = shadowAlpha;
        		this.shadow.endFill();
                //this.shadowImg.height += this.shadowGrowthSpeed;
                this.img.position.x += this.speed;
            }
        }

    }
    //create the arrow and it's shadow and sets them to the stage
    this.create = function(){
        arrowShoot.play();
        this.radius = shadowStartSize
        this.shadow.beginFill(this.shadowColor, 1);
        this.shadow.drawCircle(this.destination, this.y, this.radius);
        this.shadow.alpha = shadowAlpha;
        this.shadow.endFill();
        this.stage.addChild(this.shadow);
        this.stage.addChild(this.img);

        this.spawned = true;

        this.shadowGrowthSpeed = ( shadowMaxSize - shadowStartSize) / this.timeTillHit;//calculates how fast the shadow should grow to reach max size when the arrow hits.
    }

    //removes the arrow from the stage
    this.remove = function(){

        this.stage.removeChild(this.shadow);
        this.shadow.clear();
        this.stage.removeChild(this.img);
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
