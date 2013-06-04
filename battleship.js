
function Ship(size) {
    var shipSize = size;
    var coordX1, coordX2, coordY1, coordY2;
    this.genPosition = function(v) {
        return Math.floor((Math.random()*v));
    }
    this.genOrientation = function() {
        return Math.floor(Math.random()) ? "h" : "v";
    }
    this.genCandidate = function(board) {
            var orient = this.genOrientation();
            if (orient == "v") {
                coordX1 = this.genPosition(10);
                coordX2 = coordX1;
                coordY1 = this.genPosition(10 - shipSize);
                coordY2 = coordY1 + shipSize - 1;
            } else if (orient == "h") {
                coordY1 = this.genPosition(10);
                coordY2 = coordY1;
                coordX1 = this.genPosition(10 - shipSize);
                coordX2 = coordX1 + shipSize - 1;
            }
    }
    /*
    this.setPosition = function(board) {
        var x1 = this.genPosition();
        var y1 = this.genPosition();

        // first try vertically upwards
        var x2 = x1;
        var y2 = y2 - shipSize + 1;
        if (y2 < 0) {
         // try different orientation
            if (board.isFree(x1, y1, x2, y2)) {
                break;
            } else {
            }
    }*/
}

var Cell = {
    avail: true,
    setAvailable: function(av) {
        this.avail = av;
    },
    isFree: function() {
        return avail;
    }
}

var board = {
    cells: null,
    populate: function(size) {
        cells = new Array(size);
        for (var i = 0; i < size; i++) {
            cells[i] = new Array(size);
            for (var j = 0; j < size; j++) {
                cells[i][j] = new Cell;
            }
        }
    },
    placeShip: function(numShips, shipSize) {
        for (var s = 0; s < numShips; s++) {
            var good = false;
            while (good == false) {
                var ship = new Ship(shipSize);
                ship.genCandidate();
                if (this.isFree(ship.coordX1, ship.coordX2, ship.coordY1, ship.coordY2)) {
                    good = true;
                    break;
                }
            }
        }
    },
    isFree: function(x1, y1, x2, y2) {
        var x1_ = Math.min(x1, x2);
        var x2_ = Math.max(x1, x2);
        var y1_ = Math.min(y1, y2);
        var y2_ = Math.max(y1, y2);
        for (var i = x1_; i <= x2_; i++) {
            for (var j = y1_; i <= y2_; i++) {
                if (!cells[i][j].isAvailable()) {
                    return false;
                }
            }
        }
        return true;
    },
    checkState: function(x, y) {
        return 0;
    }
};


