var gamePattern = [];
var userClickedPattern = [];
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$("body").keypress(function(){
    if(!started) {
        started = true;
        nextSequence();
    }
});

$(".box").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//check answer
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()}, 1000
            );
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Press Any Key to Restart");
        
        restartGame();
    }
}

function nextSequence() {

    userClickedPattern = [];

    ++level;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4); //generate a random number 
    var randomChosenColour = buttonColours[randomNumber]; //it's coresponding color
    gamePattern.push(randomChosenColour);
    //select id corresponding to the button -> $("#"+randomchosenColor)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    //add audio
    playSound(randomChosenColour);
}

function restartGame() {
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(name) {
    //add audio when user clicks the button
    var audio = new Audio("soundsimon/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $( "#" + currentColor ).addClass("pressed"); 
    setTimeout(function() {
        $( "#" + currentColor ).removeClass("pressed");
    }, 100);
}