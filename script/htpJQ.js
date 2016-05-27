/* How to play */
/* When the main menu button is clicked, 
  Hides the how to play div when the main menu button is clicked.
  Displays main menu
*/
function howToPlay() {
  $('#mainMenuButton').click(function() {
  $('#howtoplayDiv').hide();
  $('#mainMenuDiv').show();})
}
