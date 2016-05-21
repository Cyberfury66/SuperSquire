//displays the game over screen and lets the user input their name
function gameOver(h, w, s) {
    //Offest for positioning elements properly
    const offset = 0.07 * h;

    //Score image properties
    const scoreImgWidth = 300;
    const scoreImgHeight = 100;
    const scoreImgPositionX = w / 2;
    const scoreImgPositionY = h / 5;

    //Score text properties
    const scoreTextPositionX = w/9 * 5;
    const scoreTextPositionY = h / 5;

    //The value for setting the anchor properties of a sprite to its center
    const centerAnchor = 0.5;

    //Letter Selector rectabgle properties
    const letterSelectorWidth = w / 18 * 8 - 27;
    const letterSelectorHeight = h/2 - 44;
    const letterSelectorX = 53;
    const letterSelectorY = 70;

    //Position properties of the letters
    const letterText1PositionX = w/9 * 4;
    const letterText1PositionY = h/2 - 10;
    const letterText2PositionX = w/2;
    const letterText2PositionY = h/2 - 10;
    const letterText3PositionX = w/9 * 5;
    const letterText3PositionY = h/2 - 10;

    //Main menu button properties
    const mainMenuButtonPositionX = w / 2;
    const mainMenuButtonPositionY = h/8*7;
    const mainMenuButtonWidth = w / 4;
    const mainMenuButtonHeight = h / 8;

    //How far the letter selector moves horizontally when the screen is swiped
    const letterSelectorMovementIncrement = w / 18;

    var div = document.getElementById('gameScreen');
    //The score the user just achieved
    var score = s;
    //The letters the user enters
    var letters = ['A', 'A', 'A'];
    //Which letter the user is currently changing
    var selectedLetter = 0;

    //PIXI stage and renderer setup
    var stage = new PIXI.Stage(0xffffff, true);
    var renderer = new PIXI.autoDetectRenderer(w, h);
    renderer.backgroundColor = 0x66FF99;

    //Hammer gesture handler setup
    var canvas = renderer.view;
    var touchHandler = new Hammer(canvas);
    touchHandler.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    //The background image
    var mountainTexture = new PIXI.Texture.fromImage('images/mountain.png');
    var mountain = new PIXI.Sprite(mountainTexture);

    mountain.width = w;
    mountain.height = h;
    mountain.position.x = 0;
    mountain.position.y = 0;

    stage.addChild(mountain);

    //An section to put the score in
    var scoreTexture= new PIXI.Texture.fromImage('assets/score.jpg');
    var scoreImg = new PIXI.Sprite(scoreTexture);

    scoreImg.width = scoreImgWidth;
    scoreImg.height = scoreImgHeight;
    scoreImg.anchor.x = centerAnchor;
    scoreImg.anchor.y = centerAnchor;
    scoreImg.position.x = scoreImgPositionX;
    scoreImg.position.y = scoreImgPositionY;

    stage.addChild(scoreImg);

    //Text that displays the user's score
    var scoreText = new PIXI.Text(score,{font : '24px Arial', fill : 0x000000, align : 'center'});
    scoreText.anchor.x = centerAnchor;
    scoreText.anchor.y = centerAnchor;
    scoreText.position.x = scoreTextPositionX;
    scoreText.position.y = scoreTextPositionY;
    stage.addChild(scoreText);

    //A rectangle that shows which letter is selected
    var letterSelector = new PIXI.Graphics();
    letterSelector.beginFill(0x604020, 1);
    letterSelector.drawRect(letterSelectorWidth, letterSelectorHeight, letterSelectorX, letterSelectorY);
    letterSelector.endFill();
    stage.addChild(letterSelector);

    //Text that displays each of the three letters individually
    var letterText1 = new PIXI.Text(letters[0],{font : '60px Arial', fill : 0xffffff, align : 'center'});
    letterText1.anchor.x = centerAnchor;
    letterText1.anchor.y = centerAnchor;
    letterText1.position.x = letterText1PositionX;
    letterText1.position.y = letterText1PositionY;
    stage.addChild(letterText1);

    var letterText2 = new PIXI.Text(letters[1],{font : '60px Arial', fill : 0xffffff, align : 'center'});
    letterText2.anchor.x = centerAnchor;
    letterText2.anchor.y = centerAnchor;
    letterText2.position.x = letterText2PositionX;
    letterText2.position.y = letterText2PositionY;
    stage.addChild(letterText2);

    var letterText3 = new PIXI.Text(letters[2],{font : '60px Arial', fill : 0xffffff, align : 'center'});
    letterText3.anchor.x = centerAnchor;
    letterText3.anchor.y = centerAnchor;
    letterText3.position.x = letterText3PositionX;
    letterText3.position.y = letterText3PositionY;
    stage.addChild(letterText3);

    //add Buttons to the game over screen
    var button = new Button(h, w, div);

    button.addButton('playAgain', stage);

    var mmTexture = new PIXI.Texture.fromImage("assets/mainMenu.png");
    var mainMenuButton = new PIXI.Sprite(mmTexture);
    mainMenuButton.anchor.x = centerAnchor;
    mainMenuButton.anchor.y = centerAnchor;
    mainMenuButton.position.x = mainMenuButtonPositionX;
    mainMenuButton.position.y = mainMenuButtonPositionY;
    mainMenuButton.width = mainMenuButtonWidth;
    mainMenuButton.height = mainMenuButtonHeight;
    mainMenuButton.interactive = true;
    mainMenuButton.on('touchstart', mainMenuButtonOnTap);
    function mainMenuButtonOnTap() {
        //request code taken from http://stackoverflow.com/questions/9713058/sending-post-data-with-a-xmlhttprequest
        var http = new XMLHttpRequest();
        var url = "textDoc.php";
        var name = letters[0] + letters[1] + letters[2];
        //alert(name + score);
        var params = "username=" + name + "&score=" + score;
        http.open("POST", url, false);

        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //http.onreadystatechange = function() {
            //if(http.readyState == 4 && http.status == 200) {
                //alert(http.responseText);
            //}
        //}
        http.send(params);
        location.reload();
    }

    mainMenuButton.click = function(mouseData) {
        //request code taken from http://stackoverflow.com/questions/9713058/sending-post-data-with-a-xmlhttprequest
        var http = new XMLHttpRequest();
        var url = "textDoc.php";
        var name = letters[0] + letters[1] + letters[2];
        //alert(name + score);
        var params = "username=" + name + "&score=" + score;
        http.open("POST", url, false);

        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                //alert(http.responseText);
            }
        }
        http.send(params);
        location.reload();
    }
    stage.addChild(mainMenuButton);

    //Moves which letter is selected to the right once
    function moveSelectionRight() {
        letterSelector.position.x += letterSelectorMovementIncrement;
    }

    //Moves which letter is selected to the left once
    function moveSelectionLeft() {
        letterSelector.position.x -= letterSelectorMovementIncrement;
    }

    //Changes the letter when the screen is swiped upward
    touchHandler.on('swipeup', function(ev) {
        if(letters[selectedLetter] != 'A') {
            letters[selectedLetter] = String.fromCharCode(letters[selectedLetter].charCodeAt() - 1);
        } else {
            letters[selectedLetter] = 'Z';
        }
    });

    //Changes the letter when the screen is swiped downward
    touchHandler.on('swipedown', function(ev) {
        if(letters[selectedLetter] != 'Z') {
            letters[selectedLetter] = String.fromCharCode(letters[selectedLetter].charCodeAt() + 1);
        } else {
            letters[selectedLetter] = 'A';
        }
    });

    //Changes which letter is selected when the screen is swiped right
    touchHandler.on('swiperight', function(ev) {
        if(selectedLetter != 2) {
            selectedLetter++;
            moveSelectionRight();
        }
    });

    //Changes which letter is selected when the screen is swiped left
    touchHandler.on('swipeleft', function(ev) {
        if(selectedLetter != 0) {
            selectedLetter--;
            moveSelectionLeft();
        }
    });

    div.appendChild(renderer.view);
    requestAnimationFrame(animate);

    //animates the sprites in the stage
    function animate() {
        letterText1.text = letters[0];
        letterText2.text = letters[1];
        letterText3.text = letters[2];
        requestAnimationFrame(animate);
        renderer.render(stage);
    }
}
