function Button(height, width, div) {
    var offset = 0.07 * height;

    const buttonWidth = width / 4;
    const buttonHeight = height / 8;
    const buttonAnchor = 0.5;
    const buttonXPos1 = width/2
    const buttonYpos1 = (height / 2 + offset * 4);
    const buttonYpos2 = ((height / 2 + offset * 4))  + (offset * 2);
    this.addButton = function(type, stage) {
        switch (type) {
            //Sets main menu button
            case 'main':
            var mainMenuTexture = new PIXI.Texture.fromImage("assets/mainMenu.png");
            var mainMenuButton = new PIXI.Sprite(mainMenuTexture);
            //anchors main menu button
            mainMenuButton.anchor.x = buttonAnchor;
            mainMenuButton.anchor.y = buttonAnchor;
            //positions main menu button
            mainMenuButton.position.x = buttonXPos1;
            mainMenuButton.position.y = buttonYpos2;
            //sizes main menu button
            mainMenuButton.width = buttonWidth;
            mainMenuButton.height = buttonHeight;
            //set main menu to a button
            mainMenuButton.interactive = true;
            //calls function triggerd by button click event
            mainMenuButton.click = function(mouseData) {
                location.reload();
            }
            //adds main menu to stage
            stage.addChild(mainMenuButton);
            break;
            //Sets play again button
            case 'playAgain':
            var playATexture = new PIXI.Texture.fromImage('assets/playAgain.png');
            var playAButton = new PIXI.Sprite(playATexture);
            //Sets play again anchor
            playAButton.anchor.x = buttonAnchor;
            playAButton.anchor.y = buttonAnchor;
            //Set play again size
            playAButton.width = buttonWidth;
            playAButton.height = buttonHeight;
            //set play again position
            playAButton.position.x = buttonXPos1;
            playAButton.position.y = buttonYpos1;
            //make play again a button
            playAButton.interactive = true;
            //calls function triggered by button click event
            playAButton.click = function(mouseData) {
                div.innerHTML = "";
                var world = new World(0, height, width);
                world.init();
            }
            //adds pay again to stage
            stage.addChild(playAButton);
            break;
        }
    }
}
