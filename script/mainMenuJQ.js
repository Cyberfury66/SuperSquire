function mainMenu() {
  var div = $('#gameScreen');
  var height = div.height();
  var widthB = div.width();

  console.log(height);
  console.log(widthB);


  $('#howtoplayDiv').hide();
  $('#gameOverDiv').hide();
  $('#leaderboardsDiv').hide();

  $('.btn').css({width: widthB / 2, height: height / 12});
  $('#muteSoundButton').css({width: widthB / 8});
  $('#muteMusicButton').css({width: widthB / 8});

  $('#playButton').click(function() {
  div.empty();
  var world = new World(0, height, widthB);
  world.init();})

  $('#howtoplayButton').click(function() {
  $('#mainMenuDiv').hide();
  $('#howtoplayDiv').show();
  howToPlay();})

  $('#leaderboards').click(function() {
  $('#mainMenuDiv').hide();
  $('#leaderboardsDiv').show();
  LeaderboardShow();})

  $('#muteSoundButton').click(function() {
    $('#muteSoundButton').find('.glyphicon').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
  })
}
