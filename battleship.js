var ShipPosition = function() {
    this.x1 = null;
    this.y1 = null;
    this.x2 = null;
    this.y2 = null;
};

function Ship(shipSize) {
    var self = this;
    this.size = shipSize;
    this.position = null;
    this.genPosition = function(boardSize) {
        return Math.floor((Math.random()*boardSize));
    };
    this.genOrientation = function() {
        return Math.floor(Math.random()) ? "h" : "v";
    };
    this.genCandidatePosition = function(board) {
        // return a candidate position in such a way that the 
        // ship will never exceeed the board bounds
        var orient = self.genOrientation();
        var position = new ShipPosition();
        if (self.size > board.size) {
            throw new Error("cannot place a ship of size " + self.size + " on board of size " + board.size);
        }
        if (orient == "v") {
            position.x1 = self.genPosition(board.size);
            position.x2 = position.x1;
            position.y1 = self.genPosition(board.size - self.size);
            position.y2 = position.y1 + self.size - 1;
        } else if (orient == "h") {
            position.y1 = self.genPosition(board.size);
            position.y2 = position.y1;
            position.x1 = self.genPosition(board.size - self.size);
            position.x2 = position.x1 + self.size - 1;
        }
        console.log("Trying out position: (" 
        + position.x1 + "," 
        + position.y1 + "),(" 
        + position.x2 + "," 
        + position.y2 + ")");
        return position;
    };
    this.placeOn = function(board) {
        console.log("Placing a ship of size " + self.size);
        // Simplest version -- keep generating candidate positions
        // until a free spot is found:
        var position;
        var i;
        for (i = 0; i < 10; i++) {
            // try to place a ship ten times, if still not placed, fail
            position = ship.genCandidatePosition(board);
            if (board.isFree(position)) {
                break;
            }
        }
        if (board.isFree(position)) {
            board.markAsTaken(position);
            self.position = position;
            board.ships.push(ship);
            return true;
        } else {
            console.log("After " + i + " tries, could not find a position for a ship of size " + self.size);
            return false;
        }
    };
}

function Cell() {
    this.avail = true;
    this.setAvailable = function(av) {
        this.avail = av;
    };
    this.available = function() {
        return this.avail;
    };
}

function Board(boardSize) {
    var self = this;
    this.size = 0;
    this.ships = [];
    this.cells = null;
    this.populate = function(size) {
        self.cells = new Array(size);
        for (var i = 0; i < size; i++) {
            self.cells[i] = new Array(size);
            for (var j = 0; j < size; j++) {
                self.cells[i][j] = new Cell();
            }
        }
        self.size = size;        
    };

    this.markAsTaken = function(position) {
        var x1_ = Math.min(position.x1, position.x2);
        var x2_ = Math.max(position.x1, position.x2);
        var y1_ = Math.min(position.y1, position.y2);
        var y2_ = Math.max(position.y1, position.y2);
        for (var i = x1_; i <= x2_; i++) {
            for (var j = y1_; i <= y2_; i++) {
                var cell = self.cells[i][j];
                cell.setAvailable(false);
            }
        }       
    };

    this.isFree = function(position) {
        var x1_ = Math.min(position.x1, position.x2);
        var x2_ = Math.max(position.x1, position.x2);
        var y1_ = Math.min(position.y1, position.y2);
        var y2_ = Math.max(position.y1, position.y2);
        for (var i = x1_; i <= x2_; i++) {
            for (var j = y1_; i <= y2_; i++) {
                var cell = self.cells[i][j];
                if (!cell.available()) {
                    return false;
                }
            }
        }
        return true;
    };

    // initialize to given size
    this.populate(boardSize);
    return this;
};

// try the whole thing
var board = new Board(10);
for (var size = 1; size <= 10; size++) {
    for (var repeat = 1; repeat <= 5; repeat++) {
        var ship = new Ship(size);
        ship.placeOn(board);
    }
}
