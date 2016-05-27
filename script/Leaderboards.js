function leaderboardShow(h, w) {
  var div = document.getElementById('gameScreen');

  var offset = 0.07 * h;
//vreate stage
  var stage = new PIXI.Stage(0xffffff, true);
  var renderer = new PIXI.autoDetectRenderer(w, h);
  renderer.backgroundColor = 0x66FF99;
//set background texture
  var mountainTexture = new PIXI.Texture.fromImage('images/mountain.png');
  var mountain = new PIXI.Sprite(mountainTexture);
// set positions and size of backgrouns
  mountain.width = w;
  mountain.height = h;
  mountain.position.x = 0;
  mountain.position.y = 0;
//add background
  stage.addChild(mountain);

  //add Buttons to the game over screen
  var button = new Button(h, w, div);
  button.addButton('mainArrow', stage);
//set leaderboard image
  var lBoardTexture = new PIXI.Texture.fromImage("assets/leaderboard.png");
  var lBoard = new PIXI.Sprite(lBoardTexture);
//set position and size leaderboard
  lBoard.anchor.x = 0.5;
  lBoard.anchor.y = 0.5;
  lBoard.position.x = w / 2;
  lBoard.position.y = h / 2 ;
  lBoard.width = w * 0.35;
  lBoard.height = h * 0.9;
//add leaderboard
  stage.addChild(lBoard);
//highscores
  var hiScores =["Name 1    150", "Name 2   125", "Name 3    75", "Name 4    50", "Name 5    25"];
  var score;

  //run through array of highscores and add them to stage
  for(var i = 0; i < hiScores.length; i++) {
      score = new PIXI.Text(hiScores[i],{font : '24px Arial', fill : 0xffffff, align : 'center'});
      score.anchor.x = 0.5;
      score.anchor.y = 0.5;
      score.position.x = lBoard.position.x;
      score.position.y = ((h / 10) * i)  + h/3;
      stage.addChild(score);
  }
  var name

  div.appendChild(renderer.view);
  requestAnimationFrame(animate);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
  }
}
