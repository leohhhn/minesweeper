const WIDTH = 40;
let canvasSize = 602;
let cols;
let rows;
let grid = [];
let gameDone = false;
let timer;
let counter;
let timeLeft = 60;

function setup() {
  createCanvas(canvasSize, canvasSize);
  cols = floor(canvasSize / WIDTH);
  rows = floor(canvasSize / WIDTH);
  generateCells();
  surrMines(grid, rows, cols);
}

function generateCells() {
  for (var i = 0; i < width; i++) {
    grid[i] = [];
    for (var j = 0; j < height; j++) {
      grid[i][j] = new Cell(i * WIDTH, j * WIDTH, WIDTH);
      grid[i][j].indexI = i;
      grid[i][j].indexJ = j;
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      grid[i][j].show();
}

function mousePressed() {
  if (mouseButton == CENTER && gameDone == false) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].flagged = true;
        }
      }
    }
  }

  if (mouseButton == LEFT) {
    if (gameDone) {
      if (mouseX > 0 && mouseX < canvasSize && mouseY > 0 && mouseY < canvasSize) {
        for (let i = 0; i < rows; i++)
          for (let j = 0; j < cols; j++)
            grid[i][j].revealed = false;
        generateCells();
        surrMines(grid, rows, cols);
        gameDone = false;
      }
    } else {

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j].contains(mouseX, mouseY)) {
            zero(grid[i][j]);
            grid[i][j].flagged = false;
            grid[i][j].revealed = true;
            if (grid[i][j].mine) {
              for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                  grid[i][j].revealed = true;
                }
              }
              gameDone = true;
              alert("Uh oh, you hit a mine! :c");
            }
          }
        }
      }
    }
  }
}

function zero(x) {
  x.revealed = true;
  if (x.mineNum == 0) {
    for (let i = x.indexI - 1; i <= x.indexI + 1; i++) {
      for (let j = x.indexJ - 1; j <= x.indexJ + 1; j++) {
        if (!grid[i][j].revealed)
          zero(grid[i][j]);
      }
    }
  } else {
    return;
  }
}

function surrMines(x, rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i > 0 && j > 0 && i < rows - 1 && j < cols - 1) {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (x[k][l].mine)
              x[i][j].mineNum++;
          }
        }
      } else if (i == 0 && j == 0) {
        for (let k = i; k <= i + 1; k++) {
          for (let l = j; l <= j + 1; l++) {
            if (x[k][l].mine)
              x[i][j].mineNum++;
          }
        }
      } else if (i == rows - 1 && j == cols - 1) {
        for (let k = i - 1; k <= i; k++) {
          for (let l = j - 1; l <= j; l++) {
            if (x[k][l].mine)
              x[i][j].mineNum++;
          }
        }
      } else if (i == 0) {
        for (let k = i; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (x[k][l].mine)
              x[i][j].mineNum++;
          }
        }
      } else if (j == 0) {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j; l <= j + 1; l++) {
            if (x[k][l].mine)
              x[i][j].mineNum++;
          }
        }
      } else if (i == rows - 1) {
        for (let k = i - 1; k <= i; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (x[k][l].mine)
              x[i][j].mineNum++;
          }
        }
      } else if (j == cols - 1) {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j; l++) {
            if (x[k][l].mine)
              x[i][j].mineNum++;
          }
        }
      }
    }
  }
}
