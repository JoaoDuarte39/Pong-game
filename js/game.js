const BackgroundImg = new Image();
BackgroundImg.src = "../images/JungleBackground.png";

const sound = new Audio();
sound.loop = true;
sound.src = "../sounds/sound.wav";

class Game {
  constructor(context) {
    this.isStarted = false;
    this.isFinished = false;
    this.context = context;
    this.score1 = 0;
    this.score2 = 0;
    this.player1 = new Player(this, 100);
    this.player2 = new Player(this, 1200);
    this.ball = new Ball(this);
    this.endScore = 5;
  }

  drawBackground() {
    // this.context.fillStyle = "black";
    // this.context.fillRect(0, 0, 1300, 700);
    this.context.drawImage(BackgroundImg, 0, 0);
  }

  drawScore() {
    this.context.font = "100px Arial";
    this.context.fillStyle = "White";
    this.context.fillText(this.score1, 250, 100, 1000);
    this.context.fillText(this.score2, 1000, 100, 1000);
  }

  setControls() {
    document.addEventListener("keydown", (e) => {
      //console.log(e);
      switch (e.keyCode) {
        case 38:
          this.player2.moveUp();
          console.log("Arrow Up");
          break;
        case 40:
          this.player2.moveDown();
          console.log("Arrow Down");
          break;
        case 87:
          this.player1.moveUp();
          console.log("Up W");
          break;
        case 83:
          this.player1.moveDown();
          console.log("Down S");
          break;
        case 32:
          console.log("Start Game");
          if (!this.isStarted) {
            this.isStarted = true;
          } else if (this.isFinished) {
            this.restartGame();
          }
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      //console.log(e);
      switch (e.keyCode) {
        case 38:
          this.player2.stop();
          console.log("Arrow Up");
          break;
        case 40:
          this.player2.stop();
          console.log("Arrow Down");
          break;
        case 87:
          this.player1.stop();
          console.log("Up W");
          break;
        case 83:
          this.player1.stop();
          console.log("Down S");
          break;
        case 32:
          console.log("Start Game");
          if (!this.isStarted) {
            this.isStarted = true;
          } else if (this.isFinished) {
            this.restartGame();
          }
          break;
      }
    });
  }

  startGame() {
    this.updateEverything(0);
    this.setControls();
    sound.play();
  }

  drawStartScreen() {
    this.context.fillStyle = "red";
    this.context.fillText(
      "Do You Want to Play My game? Press space!",
      600,
      250,
      400
    );
  }

  drawGameoverScreen() {
    this.context.fillStyle = "red";
    this.context.fillText(
      "Game Over, Want to catch some bananas? Press space!!!",
      300,
      300,
      800
    );
  }

  endGame() {
    if (this.score1 >= this.endScore) {
      //console.log("Player1 Won");
      // this.drawGameoverScreen();
      this.isFinished = true;
    }
    if (this.score2 >= this.endScore) {
      //console.log("Player2 Won");
      // this.drawGameoverScreen();
      this.isFinished = true;
    }
  }

  restartGame() {
    this.score1 = 0;
    this.score2 = 0;
    this.ball.resetBall();
    this.isStarted = true;
    this.isFinished = false;
  }

  updateEverything(timestamp) {
    // console.log(timestamp);

    requestAnimationFrame((timestamp) => {
      this.deleteEverything();
      this.moveEverything();
      this.drawEverything();
      this.updateEverything(timestamp);
    });
  }

  deleteEverything() {
    this.context.clearRect(0, 0, 1300, 700);
  }
  moveEverything() {
    //console.log("move everything");
    this.ball.moveBall();
    this.player1.movePlayer();
    this.player2.movePlayer();
  }
  drawEverything() {
    // console.log("draw everything");
    if (!this.isStarted) {
      this.drawStartScreen();
    } else if (this.isFinished) {
      this.drawGameoverScreen();
    } else {
      this.drawBackground();
      this.player1.drawPlayer();
      this.player2.drawPlayer();
      this.ball.drawBall();
      this.drawScore();
    }
  }
}
