const ballImg = new Image();
ballImg.src = "../images/BananaBall.png";

class Ball {
  constructor(game) {
    this.game = game;
    this.size = 60;
    this.image = ballImg;
    this.radius = 25;
    this.x = 650 - this.size / 2;
    this.y = 350 - this.size / 2;
    this.speedCoeficient = 1.1;
    this.velocityX = this.randomizeVelocitys(5);
    this.velocityY = this.randomizeVelocitys(2);
  }

  drawBall() {
    // this.game.context.beginPath();
    // // ctx.arc(x, y, radius, startAngle, endAngle)
    // this.game.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // this.game.context.lineWidth = 20;
    this.game.context.strokeStyle = "green"; // !
    // this.game.context.stroke();
    // this.game.context.closePath();
    this.game.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }

  randomizeVelocitys(a) {
    return Math.round(Math.random())
      ? Math.random() * a + a
      : -Math.random() * a + a;
  }

  resetBall() {
    this.x = 650 - this.size / 2;
    this.y = 350 - this.size / 2;
    this.velocityX = this.randomizeVelocitys(5);
    this.velocityY = this.randomizeVelocitys(2);
  }

  moveBall() {
    if (this.y > 700 - this.size || this.y < 0) {
      this.velocityY = this.velocityY * -1;
      this.velocityX *= 1.1;
    }
    if (this.x > 1300 || this.x < 0) {
      if (this.x < 0) {
        this.game.score2 += 1;
        this.game.endGame();
        this.resetBall();
      }
      if (this.x > 1300) {
        this.game.score1 += 1;
        this.game.endGame();
        this.resetBall();
      }
    }
    // Verificacoes player1
    if (
      !(
        this.y > this.game.player1.y + this.game.player1.height ||
        this.y < this.game.player1.y
      )
    ) {
      if (this.game.player1.x + this.game.player1.width > this.x) {
        this.velocityX = this.velocityX * -1 * this.speedCoeficient;
        this.velocityY += Math.random() * 2 - 1;
        // console.log("colidiu com player1");
      }
    }

    // Verificacoes player2
    if (
      !(
        this.y - this.size > this.game.player2.y + this.game.player2.height ||
        this.y + this.size < this.game.player2.y
      )
    ) {
      if (this.game.player2.x < this.x + this.size) {
        this.velocityX = this.velocityX * -1 * this.speedCoeficient;
        this.velocityY += Math.random() * 2 - 1;

        // console.log("colidiu com player2");
      }
    }

    // check collision with player
    //if () {
    // bounce ball back with inverse xVelocity. Maybe increase it a bit

    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}
