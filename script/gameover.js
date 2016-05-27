function gameOver(h, w) {
  var div = document.getElementById('gameScreen');

  var offset = 0.07 * h;

  var stage = new PIXI.Stage(0xffffff, true);
  var renderer = new PIXI.autoDetectRenderer(w, h);
  renderer.backgroundColor = 0x66FF99;

  var mountainTexture = new PIXI.Texture.fromImage('images/bg3.jpg');
  var mountain = new PIXI.Sprite(mountainTexture);

  mountain.width = w;
  mountain.height = h;
  mountain.position.x = 0;
  mountain.position.y = 0;

  stage.addChild(mountain);

  //add Buttons to the game over screen
  var button = new Button(h, w, div);

  button.addButton('playAgain', stage);
  button.addButton('main', stage);

  var gameOverTitle = new PIXI.Texture.fromImage("assets/gameOver.jpg");
  var gameOver = new PIXI.Sprite(gameOverTitle);

  gameOver.anchor.x = 0.5;
  gameOver.anchor.y = 0.5;
  gameOver.position.x = w / 2;
  gameOver.position.y = h / 2;
  gameOver.width = w / 4;
  gameOver.height = h / 8;

  stage.addChild(gameOver);

  // var scoreTexture = new PIXI.Texture.fromImage("assets/score.jpg");
  // var score = new PIXI.Sprite(scoreTexture);
  //
  // score.anchor.x = 0.5;
  // score.anchor.y = 0.5;
  // score.position.x = w / 2;
  // score.position.y = h / 2 + (offset * 2);
  // score.width = w / 4;
  // score.height = h / 8;
  // 
  // stage.addChild(score);

  div.appendChild(renderer.view);
  requestAnimationFrame(animate);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
  }
}
