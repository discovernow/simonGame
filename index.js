var level = 0;
var started = false;
$(document).on("keypress", function () {
  if (!started) {
    //level = 0;
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function (event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  $("#" + userChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  //Adding buffer between levels
  setTimeout(function () {
    $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
  }, 400);

  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currenLevel) {
  if (userClickedPattern[currenLevel] === gamePattern[currenLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("h1").text("Uh Oh! Game Over.\n Press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
