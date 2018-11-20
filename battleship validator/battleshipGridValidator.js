/*jshint esversion: 6 */

function validateBattlefield(field) {

    let valid = true;
    let submarines = 0;  // size 1 quantity 4
    let destroyers = 0;  // size 2 quantity 3
    let cruisers = 0;    // size 3 quantity 2
    let battleships = 0; // size 4 quantity 1

    for (let x = 0; x < field.length-1; x++) {
        for (let y = 0; y < field.length-1; y++) {
            if (field[x][y] === 1 && x > 0 && y > 0 && x < field.length && y < field.length) {
                console.log(checkForNoDiagonals(x, y), x, y);
            }
        }
    }

    function checkForNoDiagonals(x, y) {
        let sumDiagonals = (field[x - 1][y - 1]) + (field[x - 1][y + 1]) + (field[x + 1][y - 1]) + (field[x + 1][y + 1]);
        if (sumDiagonals > 0) {
            console.log(sumDiagonals);
            valid = false;
            return false;
        }
        else { return true; }
    }
    console.log(valid);
    return valid;

}

let field = 
    [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];

validateBattlefield(field);