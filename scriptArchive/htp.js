function howToPlay(h, w) {
  var div = document.getElementById('gameScreen');
  var width = div.offsetWidth;
  var height = div.offsetHeight;

  var stage = new PIXI.Stage(0xffffff, true);
  var renderer = new PIXI.autoDetectRenderer(w, h);

  var screenOneTexture = new PIXI.Texture.fromImage("images/htp.jpg");
  var sOneBG = new PIXI.Sprite(screenOneTexture);

  sOneBG.width = w;
  sOneBG.height = h;
  sOneBG.position.x = 0;
  sOneBG.position.y = 0;
  stage.addChild(sOneBG);

  function transition() {
    requestAnimationFrame(transition);
    renderer.render(stage);
  }

  var screenTwoTexture = new PIXI.Texture.fromImage("images/mountain.jpg");
  var sTwoBG = new PIXI.Sprite(screenTwoTexture);

  sTwoBG.width = w;
  sTwoBG.height = h;
  sTwoBG.position.x = w;
  sTwoBG.position.y = 0;

  stage.addChild(sTwoBG);

  //adds buttons to the how to play screen
  var button = new Button(h, w, div);
  button.addButton('next', stage);
  button.addButton('previous', stage);
  button.addButton('mainArrow', stage);

  div.appendChild(renderer.view);
  requestAnimationFrame(animate);

  function animate() {
    requestAnimationFrame(animate);

    if (sTwoBG.position.x >= 0) {
      sTwoBG.position.x -= 5;
    }

    renderer.render(stage);
  }
}
