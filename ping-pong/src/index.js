import "./styles.css";

document.getElementById("app").innerHTML = ``;

(function () {
  // Getting the elements through id's using query selector
  var ball = document.querySelector("#ball");
  var bar_a = document.querySelector("#bar_a");
  var bar_b = document.querySelector("#bar_b");
  var bar_a_score = document.querySelector("#bar_a_score");
  var bar_b_score = document.querySelector("#bar_b_score");

  // Defining names for bars and storing the data in local storage
  const storeName = "PingPongName";
  const storeScore = "PingPongMaxScore";
  const barAName = "bar 1";
  const barBName = "bar 2";

  // Defining some more useful variables
  let barAScoreUpdate = 0;
  let barBScoreUpdate = 0;

  let score1 = 0;
  let score2 = 0;

  let maximumScore,
    movement,
    bar,
    ballSpeedXAxis = 2,
    ballSpeedYAxis = 2;

  let started = false;

  // Storing the width and height of viewport
  let windowWidthInner = window.innerWidth,
    windowHeightInner = window.innerHeight;

  // Storing data in local storage
  (function () {
    bar = localStorage.getItem(storeName);
    maximumScore = localStorage.getItem(storeScore);
    if (bar === "null" || maximumScore === "null") {
      alert("LET'S PLAY THE GAME!!!");
      maximumScore = 0;
      bar = "bar_a";
    } else {
      alert(bar + " has the maximum score of " + maximumScore * 100);
    }
    resetBoard(bar);
  })();

  // Resetting the game
  function resetBoard(barName) {
    bar_a.style.left = (window.innerWidth - bar_a.offsetWidth) / 2 + "px";
    bar_b.style.left = (window.innerWidth - bar_b.offsetWidth) / 2 + "px";
    ball.style.left = (windowWidthInner - ball.offsetWidth) / 2 + "px";
    barAScoreUpdate = 0;
    barBScoreUpdate = 0;
    bar_a_score.innerHTML = 0;
    bar_b_score.innerHTML = 0;

    // Whoever losses the game get's the ball next time
    if (barName === barBName) {
      ball.style.top = bar_a.offsetTop + bar_a.offsetHeight + "px";
      ballSpeedYAxis = 2;
    } else if (barName === barAName) {
      ball.style.top = bar_b.offsetTop - bar_b.offsetHeight + "px";
      ballSpeedYAxis = -2;
    }

    score1 = 0;
    score2 = 0;
    started = false;
  }

  // After Winning Display Score
  function storeWin(bar, score) {
    console.log("bar name is " + bar + "Score is " + score);
    if (score > maximumScore) {
      maximumScore = score;
      localStorage.setItem(storeName, bar);
      localStorage.setItem(storeScore, maximumScore);
    }
    clearInterval(movement);
    resetBoard(bar);

    alert(bar + " wins with a score of " + score * 100);
  }

  // Adding Event Listener on pressing the key
  window.addEventListener("keypress", function () {
    let barSpeed = 20;

    let barRect = bar_a.getBoundingClientRect();

    if (
      event.code === "KeyD" &&
      barRect.x + barRect.width < window.innerWidth
    ) {
      bar_a.style.left = barRect.x + barSpeed + "px";
      bar_b.style.left = bar_a.style.left;
    } else if (event.code === "KeyA" && barRect.x > 0) {
      bar_a.style.left = barRect.x - barSpeed + "px";
      bar_b.style.left = bar_a.style.left;
    }

    // When user presses the Enter key
    if (event.code === "Enter") {
      if (!started) {
        started = true;
        let ballRect = ball.getBoundingClientRect();
        let ballX = ballRect.x;
        let ballY = ballRect.y;
        let ballDia = ballRect.width;

        let barAHeight = bar_a.offsetHeight;
        let barBHeight = bar_b.offsetHeight;
        let barAWidth = bar_a.offsetWidth;
        let barBWidth = bar_b.offsetWidth;

        movement = setInterval(function () {
          // Moving the ball
          ballX += ballSpeedXAxis;
          ballY += ballSpeedYAxis;

          barAX = bar_a.getBoundingClientRect().x;
          barBX = bar_b.getBoundingClientRect().x;

          ball.style.left = ballX + "px";
          ball.style.top = ballY + "px";

          if (ballX + ballDia > windowWidthInner || ballX < 0) {
            ballSpeedXAxis = -ballSpeedXAxis; // Reverses the direction
          }

          // Defining the center of the ball on display
          let ballPos = ballX + ballDia / 2;

          // Checking for bar 1
          if (ballY <= barAHeight) {
            // Changing ball direction in the opposite direction
            ballSpeedYAxis = -ballSpeedYAxis;
            score1++;
            barAScoreUpdate++;
            bar_a_score.innerHTML = barAScoreUpdate * 100;

            // Checking if any of the bar losses
            if (ballPos < barAX || ballPos > barAX + barAWidth) {
              storeWin(barBName, score1);
            }
          }

          // Checking for bar 2
          else if (ballY + ballDia >= windowHeightInner - barBHeight) {
            // Changing ball direction in the opposite direction
            ballSpeedYAxis = -ballSpeedYAxis;
            score2++;
            barBScoreUpdate++;
            bar_b_score.innerHTML = barBScoreUpdate * 100;

            // Checking if any of the bar losses
            if (ballPos < barBX || ballPos > barBX + barBWidth) {
              storeWin(barAName, score2);
            }
          }
        }, 10);
      }
    }
  });
})();
