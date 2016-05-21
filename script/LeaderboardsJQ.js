/*Leaderbords*/
/* When the main menu button is clicked,
Hides the Leaderbords when the main menu button is clicked.
Displays main menu
*/
function LeaderboardShow() {

    var hiScores = ["", "", ""];
    //Used to process the JSON objects that come from the request
    function processScores(data) {
        var records = JSON.parse(data);
        //alert(records);
        //Formats what is in records properly, and stores it
        for(var i = 0; i < records.length; i++) {
            hiScores[i] = records[i][0] + "            " + records[i][1];
            //alert(hiScores[i]);
        }

        //Formats hiscore for displaying
        var str;
        for (var i = 0; i < 5; i++) {
            str = i + 1 + ") " + hiScores[i];
            $('p').append(str + "<br />");
        }
    }

    //Request code taken from http://www.w3schools.com/json/json_http.asp
    var xmlhttp = new XMLHttpRequest();
    var url = "textDoc.php";

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //alert(xmlhttp.responseText);
            processScores(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", url, false);
    xmlhttp.send();

    //When the button is clicked, hide this screen and show another
    $('#mainMenuButtonL').click(function() {
        $('#leaderboardsDiv').hide();
        $('#mainMenuDiv').show();
    })
}
