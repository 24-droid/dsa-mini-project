class Cell {
  constructor(col, row) {
      this.row = row;
      this.col = col;
      this.walls = [true, true, true, true];
      this.included = true;
      this.visited = false;
  }

  checkNeighbors() {
      let neighbors = [];

      let top = grid[index(this.col, this.row - 1)];
      let right = grid[index(this.col + 1, this.row)];
      let bottom = grid[index(this.col, this.row + 1)];
      let left = grid[index(this.col - 1, this.row)];

      if (top && top.included && !top.visited) {
          neighbors.push(top);
      }
      if (right && right.included && !right.visited) {
          neighbors.push(right);
      }
      if (bottom && bottom.included && !bottom.visited) {
          neighbors.push(bottom);
      }
      if (left && left.included && !left.visited) {
          neighbors.push(left);
      }

      if (neighbors.length > 0) {
          return random(neighbors);
      } else {
          return undefined;
      }
  }

  highLight() {
      let x = this.col * w + w / 2;
      let y = this.row * w + w / 2;

      noStroke();
      fill('red');
      ellipse(x, y, w, w);
  }

  path() {
      let x = this.col * w;
      let y = this.row * w;

      fill(255);
      noStroke();
      rect(x, y, w, w);
  }

  show() {
      let x = this.col * w;
      let y = this.row * w;

      noFill();
      stroke(0);
      strokeWeight(w / 5);

      if (this.walls[0]) {
          line(x, y, x + w, y);
      }
      if (this.walls[1]) {
          line(x + w, y, x + w, y + w);
      }
      if (this.walls[2]) {
          line(x + w, y + w, x, y + w);
      }
      if (this.walls[3]) {
          line(x, y + w, x, y);
      }
  }
}
