class Cell {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.indexI = 0;
    this.indexJ = 0;
    this.width = width;
    if (random(1) < 0.25) {
      this.mine = true;
    } else {
      this.mine = false;
    }
    this.revealed = false;
    this.flagged = false;
    this.mineNum = 0;
  }

  show() {
    strokeWeight(3);
    stroke(0);
    noFill();
    rect(this.x, this.y, this.width, this.width);

    if (this.revealed) {
      if (this.mine) {
        fill(255, 0, 0);
        strokeWeight(2);
        ellipse(this.x + this.width / 2, this.y + this.width / 2, this.width * 0.5);
      } else {
        fill(170);
        rect(this.x, this.y, this.width, this.width);
        textSize(25);
        fill(0);
        strokeWeight(1);
        if (this.mineNum != 0)
          text(this.mineNum, this.x - 7 + this.width / 2, this.y + this.width - 10);
      }
    }

    if (this.flagged) {
      fill(28, 88, 255);
      strokeWeight(2);
      rect(this.x + 10, this.y + 10, 20, 20);
    }
  }

  contains(x, y) {
    return x > this.x && y > this.y && x < this.x + this.width &&
      y < this.y + this.width;
  }
}
