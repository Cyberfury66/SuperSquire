function gameOver(score, stage) {
  var div = $('#gameScreen');
  var height = div.height();
  var width = div.width();

  $('#gameOverDiv').show();
  $('#myModal').modal("show");

  $('#scoreText').text("Score: " + score + "  High Score: " + window.userInfo.hiScore);

  $('#submitScoreButton').click(function() {
    $('#submitScoreButton').hide();
  })

  $('#mainMenuButtonGO').click(function() {
    location.reload();
  })

  $('#playAgainButtonGO').click(function() {
    $('#gameOverDiv').hide();
    div.innerHTML = "";
    var world = new World(0, height, width);
    world.init();
  })
}