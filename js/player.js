class Player {
  constructor(game, x) {
    this.x = x;
    this.y = 300;
    this.velocityY = 0;
    this.game = game;
    this.width = 20;
    this.height = 150;
  }

  movePlayer() {
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > 700) {
      this.y = 700 - this.height;
    } else {
      this.y += this.velocityY;
    }
  }

  moveUp() {
    this.velocityY += -5;
  }
  moveDown() {
    this.velocityY -= -5;
  }

  stop() {
    this.velocityY = 0;
  }

  drawPlayer() {
    this.game.context.fillStyle = "White";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    // console.log("draw player");
  }
}
