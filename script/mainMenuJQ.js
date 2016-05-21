/* Main Menu */
function mainMenu() {
  const wratio = 2;
  const hratio = 12;
  const bratio = 8;
  var div = $('#gameScreen');
  var height = div.height();
  var widthB = div.width();

  /* Hiding all divs except for main menu */
  $('#howtoplayDiv').hide();
  $('#gameOverDiv').hide();
  $('#leaderboardsDiv').hide();
  $('#mainGame').hide();

  /* re-sizing the buttons */
  $('.btn').css({width: widthB / wratio, height: height / hratio});
  $('#muteSoundButton').css({width: widthB / bratio});
  $('#muteMusicButton').css({width: widthB / bratio});

  /* starts the game when the play button is clicked and hides the main menu div */
  $('#playButton').click(function() {
    $('#mainMenuDiv').hide();
    $('mainGame').show();
    var world = new World(0, height, widthB);
    world.init();
  })

  /* starts the how to play tutorial and hides the main menu div */
  $('#howtoplayButton').click(function() {
    $('#mainMenuDiv').hide();
    $('#howtoplayDiv').show();
    howToPlay();
   })

  /* displays the leaderboard and hides the main menu div */
  $('#leaderboards').click(function() {
  $('#mainMenuDiv').hide();
  $('#leaderboardsDiv').show();
  LeaderboardShow();})

  /* music / mute button: switehces to mute and speaker icons */
  $('#muteSoundButton').click(function() {
    if ($('#muteSoundButton').find('.glyphicon').hasClass('glyphicon-volume-up')) {
    $('#muteSoundButton').find('.glyphicon').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
    } else {
      $('#muteSoundButton').find('.glyphicon').removeClass('glyphicon-volume-off').addClass('glyphicon-volume-up');
    }
  })
}
