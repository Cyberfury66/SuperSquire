function mainMenuShow() {

  var div = document.getElementById('gameScreen');
  var width = div.offsetWidth;
  var height = div.offsetHeight;

  var offset = 0.07 * height;

  var stage = new PIXI.Stage(0xffffff, true);
  var renderer = new PIXI.autoDetectRenderer(width, height);
  renderer.backgroundColor = 0x66FF99;

  var mountainTexture = new PIXI.Texture.fromImage('images/mountain.png');
  var mountain = new PIXI.Sprite(mountainTexture);

  mountain.width = width;
  mountain.height = height;
  mountain.position.x = 0;
  mountain.position.y = 0;

  stage.addChild(mountain);

  var logoTexture = new PIXI.Texture.fromImage('assets/logo.png');
  var logo = new PIXI.Sprite(logoTexture);

  logo.anchor.x = 0.5;
  logo.anchor.y = 0.5;
  logo.width = width / 4;
  logo.height = height / 2;
  logo.position.x = width / 2;
  logo.position.y = height / 4;

  stage.addChild(logo);

  var button = new Button(height, width, div);

  //adding the buttons to the main menu
  button.addButton('start', stage);
  button.addButton('howtoplay', stage);
  button.addButton('leaderboards', stage);

  div.appendChild(renderer.view);
  requestAnimationFrame(animate);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
  }
};
