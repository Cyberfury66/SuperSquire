function gameOver() {
  var div = $('#gameScreen');

  $('#mainMenuButton').click(function() {
    $('#gameOverDiv').hide();
    $('#mainMenuDiv').show();
})

  $('#playAgainButton').click(function() {
    div.empty();
    var world = new World(0, height, width);
    world.init();
  })
}
