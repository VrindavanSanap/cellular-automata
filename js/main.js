let grid;
let cols;
let rows;
let resolution = 5;
let mouse_col;
let mouse_row;
let last_clicked_row;
let last_clicked_col;

let is_running = true;

function setup() {
    createCanvas(500, 500);
    frameRate(10);
    cols = Math.floor(width / resolution);
    rows = Math.floor(height / resolution);
    grid = new Grid(rows, cols);
    nj.config.printThreshold = 100;
}

function keyPressed() {
    if (key === "p") {
        is_running = !is_running;
        console.clear()

    }
    if (key === "s") {
        grid.step()

    }
    if (key === "r") {
        grid.reset();
        console.clear()

    }
}

function draw() {
    background(255);
    mouse_col = Math.floor(mouseX / resolution);
    mouse_row = Math.floor(mouseY / resolution);

    grid.display(resolution);
    if (mouse_row < rows && mouse_col < cols) {
        grid.highlight(mouse_row, mouse_col, resolution);
    }
    if (is_running) {
        grid.step();
    }
    if (mouseIsPressed) {
        if (!(last_clicked_col === mouse_col && last_clicked_row === mouse_row)) {
            grid.flip(mouse_row, mouse_col);
            last_clicked_col = mouse_col;
            last_clicked_row = mouse_row;
        }
    }
}

function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
}
