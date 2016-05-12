function Arrow(height, stg){

  this.shadowTex = PIXI.Texture.fromImage("assets\\shadow.png");
  this.shadowImg = new PIXI.Sprite(this.shadowTex);

  this.start;
  this.end;
  this.speed = 10;

  this.x = 0;
  this.stage = stg;
  this.spawned = false;
  this.redherring = false;

  this.getImg = function(){
    return this.img;
  }

  this.setImg = function(){
      var num = Math.floor((Math.random()*5) + 1);
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

  this.isRedherring = function() {
      return this.redherring;
  }

  this.getShadowImg = function(){
    return this.shadowImg;
  }

  this.setStart = function(){
    this.start = Math.floor((Math.random() * 3) + 1);
    if(this.start == 1){
      this.y = height/2;
    } else if(this.start == 2){
      this.y = height/6;
    } else {
      this.y = (height/6) * 5;
    }
  }

  this.setEnd = function(){
    this.end = Math.floor((Math.random() * 3) + 1);
    if(this.redherring == false) {
        if(this.end == 1){
          this.destination = 800;
        } else if(this.end == 2){
          this.destination = 700;
        } else {
          this.destination = 570;
        }
    } else {
        this.destination = 960;
    }

  }

  this.getX = function(){
    return this.x;
  }

  this.getY = function(){
    return this.y;
  }

  this.getDestination = function(){
    return this.destination;
  }

  this.getPosition = function(){
    return this.img.position.x;
  }
  this.isSpawned = function(){
    return this.spawned;
  }

  this.move = function(){
    if(this.redherring == true) {
        this.img.position.x += this.speed;
        this.img.rotation += 0.05;
    } else {
        this.shadowImg.width += this.speed * .1;
        this.shadowImg.height += this.speed * .1;
        this.img.position.x += this.speed;
    }
  }

  this.create = function(){
    this.shadowImg.width = 1;
    this.shadowImg.height = 1;
    this.stage.addChild(this.shadowImg);
    this.stage.addChild(this.img);

    this.spawned = true;
  }

  this.remove = function(){
    this.stage.removeChild(this.img);
    this.stage.removeChild(this.shadowImg);
    this.spawned = false;
  }
}
