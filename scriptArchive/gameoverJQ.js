function gameOver() {

  var height = $('gameScreen').height;
  var width = $('gameScreen').width;

  $('#mainMenuButtonC').click(function() {
    $('#gameOverDiv').hide();
    $('#mainMenuDiv').show();
})

  $('#playAgainButton').click(function() {
    $('#gameOverDiv').hide();
    var world = new World(0, height, width);
    world.init();
  })
}
