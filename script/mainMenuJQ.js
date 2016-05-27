/* Main Menu */
function mainMenu() {
    const wratio = 2;
    const hratio = 12;
    const bratio = 8;
    const pauseHRatio = 8;
    const pauseWRatio = 15;
    var div = $('#gameScreen');
    var height = div.height();
    var widthB = div.width();

    var music1 = new Howl({
        urls: ["audio/AngevinB.ogg", "audio/AngevinB.mp3"],
        volume: 0.5,
        loop: true,
        autostart: true,
    });

    music1.play();

    //getCookie and setCookie functions taken from http://www.w3schools.com/js/js_cookies.asp
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    this.getCookie = getCookie;

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    this.setCookie = setCookie;

    if(this.getCookie("user")) {
        var name = this.getCookie("user");
    } else {
        var name = prompt("Enter your username");
        this.setCookie("user", name, 300);
    }
    //request code taken from http://stackoverflow.com/questions/9713058/sending-post-data-with-a-xmlhttprequest
    var http = new XMLHttpRequest();
    var url = "php/getUser.php";
    var params = "&username=" + name;
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var user = JSON.parse(http.responseText)[0];
            console.log(user);
            console.log(user.hiScore);
            window.userInfo = user;
            
            if(window.userInfo.herringsSeen > 0) {
                $('#achieve1').attr("src","images/A1.jpg");
            }

            if(window.userInfo.herringClicked == 1) {
                $('#achieve2').attr("src","images/A2.jpg");
            }

            if(window.userInfo.arrowsBlocked >= 100) {
                $('#achieve3').attr("src","images/A3.jpg");
            }
        }
    }
    http.send(params);

    /* re-sizing the buttons */
    $('.btn').css({width: widthB / wratio, height: height / hratio});
    $('#muteSoundButton').css({width: widthB / bratio});
    $('#logoutButton').css({width: widthB / bratio});
    $('#pButton').css({width: widthB / pauseWRatio, height: height/ pauseHRatio});

    $('#logoutButton').click(function() {
        setCookie("user", name, -1);
        location.reload();
    })

    /* starts the game when the play button is clicked and hides the main menu div */
    $('#playButton').click(function() {
        $('#mainMenuDiv').hide();
        $('#uiDiv').show();
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
                music1.pause();
            } else {
                $('#muteSoundButton').find('.glyphicon').removeClass('glyphicon-volume-off').addClass('glyphicon-volume-up');
                music1.play();
            }
        })

        $('#muteMusicButton').click(function() {
            $('#music').pause();
        })
    }
