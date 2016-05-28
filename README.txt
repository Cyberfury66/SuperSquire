Super Squire Sprint #2 -- README & User Guide

	  Group 12:
Michael Goll  || A00964890 || Set 2E
Nathan Barber || A00965240 || Set 2E
Maitiu Morton || A00927606 || Set 2E
Amir Shayegh  || A00767702 || Set 2E

** Run in Firefox if using local host/Machine**

www.supersquire.ca 

-- Overview --
	You are a squire to a lazy knight who decides to take a break mid-battle. As his squire, it is up to you to block an onslaught of never-ending arrows of different types using different shields. You must use your reflexes to move around the field and protect the knight and his supplies. 



-- Changes --

Additions:
-Music 
-Achievements
-Final Art
-LeaderBoard Polish
-Anger Meter

Fixed:
-Arrow art finalized
-LeaderBoard Text
-Game over screen
-LeaderBoard uses database now

Notes: 
-When Anger meter reaches max you are allowed one more mistake and then the game is over. 


-- Technologies -- 
jQuery
JavaScript
PHP
HTML5
CSS / CSS3
PIXI.js
HAMMER.js
Windows Server



-- Code Structure --

Menus
	For each menu, there is a specific Javascript or jQuery file that enables the buttons on that screen. Each screen is placed inside of its own div in the html file and is either hidden or shown depending on which menu has been selected.

	The menus are styled using CSS and are structured in the HTML file.

	"JQ" stands for the JQ version of this Javascript file

   'mainMenuJQ.js'
	- Handles the click events for the "Play", "How To Play" and "Leaderboards" buttons
	- Hides all other divs from being viewed
	- Calculates the screen height and resizes the two mute buttons

   'htpJQ.js'
	- Handles the click event for the "Main Menu" button

   'gameover.js'
	- Replaces the game screen with the "Game Over" screen
	- Resizes buttons and background images to fit the device screen
	- Shows the player's score at the end of the game

   'LeaderboardsJQ.js'
	- Handles the click event for the "Main Menu" button

   'Button.js'
	- Handles the click events for the "Main Menu" and "Play Again" buttons on the 'Game Over' screen.
	- Adds the "Play Again" and "Main Menu" buttons to the stage in the 'Game Over' screen.

Game
   'World.js' 
	- Instantiates the entire world for the game and calculates the screen size to correctly resize the screen to fit the device it is running on.
	- Passes the stage and width and height dimensions to the 'Arrow.js' class
	- Passes the column, row and middle coordinates to the cells in the 'Cell.js' class
	- Checks for collisions between the Squire and the arrows every frame
	- Handles player input in regards to key presses and swipes

   'Arrow.js' 
	- Creates an arrow object based on the type of arrow that is spawned. Assigns different textures and animates each arrow.
	- Selects a destination point to land
	- Creates the shadow displayed on screen in its destination

   'Cell.js'
	- Create a cell object that holds the Squire.
	- Draws and erases the Squire when the Squire enters and exits the cell.
	- Returns its x and y coordinates on the screen

   'Squire.js'
	- Creates a Squire object that holds a shield
	- Stores the Squire's current position on screen.
	- Validates potential positions on the screen.
	- Stores and displays which shield the Squire is holding

Structure
   'pixi.js'
	- Holds the minified version of the PIXI.js library
	- Used to render in-game images

    'hammer.min.js'
	- Holds the minified version of the HAMMER.js library
	- Used to interpret swipes for mobile controls

-- Issues and Problems --
Issues:
	- CSS styling
	- Learning PHP
	- Bootstrap structuring of HTML page

Problems:
	- Communication between PHP, Javascript and jQuery
	- Working with Mongo
	- Data transferring between server and game




-- User Guide --

Gameplay
	- The game is fully functioning with all three different types of arrows spawning all three corresponding shields with full hit detection. The Anger meter is also fully implemented as a numerical value at the moment. It will later be represented by a bar that will fill up. Mobile controls are fully integrated into the game and menu system. 

	- The mobile controls are swipe to move the squire in the desired direction and tap to select a shield (on the left side of the screen).

	- The keyboard controls are WASD or the arrow keys to move the squire in the desired direction and click on the shield buttons or the 123 keys on either the keyboard or numpad.

	1 key --> Metal Shield
	2 key --> Wood Shield
	3 key --> Spell Tome

	- You must use the correct shield to block the correct arrow type. They are as follows:

	Wood Shield  BLOCKS wood arrows
	Metal Shield BLOCKS fire arrows
	Spell Tome   BLOCKS magic arrows

	- Anger meter will increment by one every time you either block an arrow with the wrong type of shield or allow an arrow to hit the ground. When the anger meter reaches 5, the game is over and you lost.

	- Score is calculated by each arrow you block. Each arrow represents a score of 1

User Interface
	- Once in game, the shield buttons are located on the left side of the screen. Each shield can be selected by tapping, clicking or pressing the corresponding button (see above).

	- The blue square in the top right represents an alpha version of a pause button. Once paused, simply tap or click again to resume play.

	NOTE: Pause menu is not yet implemented, the game will simply pause.

	- The red square in the top right represents an alpha version of a quit button. Once tapped or clicked, it will bring you to the "Game Over" screen and display your score. You can quit while paused.

	- The squire (you) is represented by the shield in the grid on the right side.

	- Each arrow type is represented by a different sprite.

	Wood Arrow (brown)      --> wood arrow
	Fire Arrow (red/yellow) --> arrow surrounded in fire
	Magic Arrow (blue)      --> round ball surrounded in magic

	NOTE: The arrow art is NOT final, it will be changed for final delivery. 