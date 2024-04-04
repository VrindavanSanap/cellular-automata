function make2DArray(rows, cols) {
    var arr = new Array(rows);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols).fill(0);
    }
    return arr;
}
function equalArray(a, b) {
    if (a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

class Grid {
    constructor(rows, cols) {
        this.cols = cols;
        this.rows = rows;
        this.grid = make2DArray(rows, cols); // Fixed function name to make2DArray
        this.curr = 0;
        this.grid[Math.floor(0)][Math.floor(cols / 2)] = 1; // Fixed assignment to set a specific cell to 1
        // this.grid[0][1] = 1;
        this.next = this.grid.map(row => [...row]); // Cloning the grid properly
    }

    display(resolution) {
        strokeWeight(1)
        stroke(0)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = j * resolution;
                let y = i * resolution;
                if (this.grid[i][j]) {
                    fill(0);
                } else {
                    fill(255)
                }
                rect(x, y, resolution, resolution);
            }
        }
    }

    highlight(row, col, resolution) {
        let x = col * resolution;
        let y = row * resolution;
        fill(0, 0, 0, 0);
        stroke(200, 0, 0);
        strokeWeight(1.5)
        rect(x, y, resolution, resolution);
    }
    calculate_next_step(step) {
        let next_step = [];
        for (let i = 0; i < step.length; i++) {
            let left = i === 0 ? step[step.length - 1] : step[i - 1];
            let center = step[i];
            let right = i === step.length - 1 ? step[0] : step[i + 1];

            if (left === 1 && center === 1 && right === 1) {
                next_step[i] = 0;
            } else if (left === 1 && center === 1 && right === 0) {
                next_step[i] = 0;
            } else if (left === 1 && center === 0 && right === 1) {
                next_step[i] = 0;
            } else if (left === 1 && center === 0 && right === 0) {
                next_step[i] = 1;
            } else if (left === 0 && center === 1 && right === 1) {
                next_step[i] = 1;
            } else if (left === 0 && center === 1 && right === 0) {
                next_step[i] = 1;
            } else if (left === 0 && center === 0 && right === 1) {
                next_step[i] = 1;
            } else if (left === 0 && center === 0 && right === 0) {
                next_step[i] = 0;
            }
        }
        return next_step;
    }

    step() {
        let next_step = this.calculate_next_step(this.grid[this.curr % this.rows]);
        
        this.curr += 1;
        this.next[this.curr % this.rows] = next_step;
        console.log(this.curr);
        this.grid = this.next.map(row => [...row]);
    }

    flip(row, col) {
        if (this.grid[row][col] === 1) {
            this.grid[row][col] = 0;
            this.next = this.grid.map(row => [...row]);
        } else if (this.grid[row][col] === 0) {
            this.grid[row][col] = 1;
            this.next = this.grid.map(row => [...row]);
        }
    }
    reset() {
        this.grid = make2DArray(this.rows, this.cols);
    }
}
