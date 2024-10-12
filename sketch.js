let cols;
let rows;
let w = 8;
let margin = 20;
let grid = [];
let current;
let stack = [];
let img;
let but1, but2, but3, but4, but5;
let unicorn, square, circle, star, heart;

function preload() {
  unicorn = loadImage('licorne.png');
  square = loadImage('carre.png');
  circle = loadImage('rond.png');
  star = loadImage('etoile.png');
  heart = loadImage('coeur.png');
}


function setup() {
  img = square;
  cols = img.width;
  rows = img.height;
  canvas = createCanvas(cols * w + margin * 2, rows * w + margin * 2);

  but1 = createImg('carre.png', "Square");
  but1.mousePressed(function() {
    img = square;
    init();
  });

  but2 = createImg('rond.png', "Circle");
  but2.mousePressed(function() {
    img = circle;
    init();
  });

  but3 = createImg('etoile.png', "Star");
  but3.mousePressed(function() {
    img = star;
    init();
  });

  but4 = createImg('coeur.png', "Heart");
  but4.mousePressed(function() {
    img = heart;
    init();
  });

  but5 = createImg('licorne.png', "Unicorn");
  but5.mousePressed(function() {
    img = unicorn;
    init();
  });

  init();
}

function draw() {
  background(200);

  translate(margin,margin);

  for (let i = 0; i < grid.length; i++) {
   if (grid[i].visited) grid[i].path();
  }

  for (let i = 0; i < grid.length; i++) {
   if (grid[i].visited) grid[i].show();
  }

  current.visited = true;

  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
  if (stack.length > 0) current.highLight();  
}

function init() {
  stack = [];
  grid = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cell = new Cell(c, r)
      grid.push(cell);
    }
  }

  img.loadPixels();
  for (let i = 0; i < img.pixels.length / 4; i++) {
    let alpha = img.pixels[i * 4 + 3];
    if (alpha == 0) {
      grid[i].included = false;
    }
  }
  for (let i = 0; i < grid.length; i++) {    
    if (grid[i].included) {
      current = grid[i];
      return 0;
    }
  }
}
  


function generate() {
  current.visited = true;

  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function index(col, row) {
  if (col < 0 || col >= cols || row < 0 || row >= rows) {
    return -1;
  }
  return row * cols + col;
}

function removeWalls(a, b) {
  let x = a.col - b.col;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.row - b.row;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}